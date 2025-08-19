"use client";

import useBottomSheetStore, {
  BottomSheetStore,
} from "@/stores/useBottomSheetStore";
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";

type NewBottomSheetInfo<T> = Omit<
  BottomSheetStore<T>["BottomSheetInfoHistory"][0],
  "id"
>;

const useBottomSheet = <TContentProps>() => {
  const { BottomSheetInfoHistory, updateBottomSheetInfoHistory } =
    useBottomSheetStore();
  const [id, setId] = useState<string | undefined>(undefined);

  /**
   * 현재 렌더링 중인지 (history stack의 top에 있는지)를 확인합니다.
   * @returns Boolean
   */
  const checkRendered = () => {
    if (BottomSheetInfoHistory.length === 0) return false;
    return BottomSheetInfoHistory[BottomSheetInfoHistory.length - 1].id === id;
  };

  /**
   * 현재 열려있는지 (history stack에 존재하는지)를 확인합니다.
   * @returns Boolean
   */
  const checkOpened = () => {
    return BottomSheetInfoHistory.filter((info) => info.id === id).length > 0;
  };

  /**
   *
   * 바텀시트를 새로 엽니다. 바텀 시트 히스토리 스택에 추가합니다.
   * @param newBottomSheetInfo 새로 열 바텀시트 정보
   * @returns 바텀시트 id. 업데이트에 사용됩니다.
   */
  const openBottomSheet = (
    newBottomSheetInfo: NewBottomSheetInfo<TContentProps>,
  ) => {
    //
    // const newBottomSheetId = crypto.randomUUID();
    const newBottomSheetId = uuidV4();
    updateBottomSheetInfoHistory((prev) => {
      const newHistory = [
        ...prev,
        { ...newBottomSheetInfo, id: newBottomSheetId },
      ];
      return newHistory;
    });
    setId(newBottomSheetId);
  };

  /**
   * 바텀시트를 업데이트 합니다. 해당 바텀시트가 렌더링 되고 있지 않아도 props등은 업데이트 됩니다.
   * @param newBottomSheetInfo 업데이트할 bottomsheetinfo. id값이 필요합니다.
   * @returns id에 매칭되는 바텀시트가 존재하면 업데이트 후 true반환. 아니면 false 반환.
   */
  const updateBottomSheet = (
    // id: string,
    newBottomSheetInfoOrFunc:
      | NewBottomSheetInfo<TContentProps>
      | ((
          prev: NewBottomSheetInfo<TContentProps>,
        ) => NewBottomSheetInfo<TContentProps>),
  ) => {
    const foundIdx = BottomSheetInfoHistory.findIndex((info) => info.id === id);

    // id에 해당되는 바텀시트 못 찾았다면 (id값이 undefined라도), 현재 보여지지 않아도 하지 말자.
    if (
      foundIdx === -1 ||
      !id ||
      foundIdx !== BottomSheetInfoHistory.length - 1
    ) {
      return false;
    }

    // 찾았다면

    const newBottomSheetInfo =
      typeof newBottomSheetInfoOrFunc === "function"
        ? newBottomSheetInfoOrFunc(BottomSheetInfoHistory[foundIdx])
        : newBottomSheetInfoOrFunc;

    updateBottomSheetInfoHistory((prev) => {
      const newHistory = [...prev];
      newHistory[foundIdx] = { ...newBottomSheetInfo, id };
      return newHistory;
    });
    return true;
  };

  /**
   * 최근에 연 바텀시트를 닫습니다. 히스토리에서 지웁니다.
   * 이전의 것이 히스토리에 남아있다면, 이전의 바텀시트가 렌더링됩니다.
   */
  const closeBottomSheet = () => {
    if (!id) return false;
    updateBottomSheetInfoHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev].filter((info) => info.id !== id);
      //test
      console.log("newHistory: ", newHistory);
      setId(undefined);
      // const newHistory = [...prev].slice(0, prev.length - 1);
      return newHistory;
    });
    return true;
  };

  /**
   * 바텀시트 hisotry를 비웁니다.
   */
  const resetBottomSheetHistory = () => {
    updateBottomSheetInfoHistory([]);
  };

  return {
    checkRendered,
    checkOpened,
    openBottomSheet,
    updateBottomSheet,
    closeBottomSheet,
    resetBottomSheetHistory,
  };
};

export default useBottomSheet;
