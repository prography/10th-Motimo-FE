"use client";

/**
 * [요구사항]
 *
 * 1. 전역에서 모달이 1개만 사용되도록 해야 함.
 * 2. 페이지 이동 시 모달이 꺼져야 함. (뒤로,앞으로 가기)
 *  - next의 path를 체크해서 초기화 하는 방식으로..
 * 3. 여러 곳에서 각기 다른 모달을 하나의 훅에 대해 사용할 수 있어야 함.
 * 4. 모달안에서 비동기동작을 수행하고, 종료하면 밖에선 revalidate를 시켜야 함.
 *    ㄴ> swr방식이라 딜레이가 있을 수도 있음. 이게 싫으면 서버 revalidate를 시키거나 optimistic update해야함.
 *    이에 대한 선택권은 각 모달 사용할 때 처리할 수 있도록 책임 넘김
 */

import useModalStore from "@/stores/useModalStore";
import { ReactNode } from "react";

const useModal = () => {
  const setOpenedModal = useModalStore((state) => state.updateModal);

  const openModal = (ModalComponent: ReactNode) => {
    setOpenedModal(ModalComponent);
  };
  const closeModal = () => {
    setOpenedModal(null);
  };

  return { openModal, closeModal };
};

export default useModal;
