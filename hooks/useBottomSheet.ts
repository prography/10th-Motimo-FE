"use client";

import useBottomSheetStore, {
  BottomSheetStore,
} from "@/stores/useBottomSheetStore";

const useBottomSheet = <TContentProps>() => {
  const setOpenedBottomSheet = useBottomSheetStore(
    (state) => state.updateBottomSheetInfo,
  );

  const renderBottomSheet = (
    bottomSheetInfo: // BottomSheetStore<TContentProps>["BottomSheetInfo"],
    Parameters<BottomSheetStore<TContentProps>["updateBottomSheetInfo"]>[0],
  ) => {
    setOpenedBottomSheet((prev) => {
      if (typeof bottomSheetInfo === "function") {
        return bottomSheetInfo(prev);
      }
      if (bottomSheetInfo === null || bottomSheetInfo === undefined)
        return null;
      return {
        backdropProps: bottomSheetInfo.backdropProps,
        contentProps: bottomSheetInfo.contentProps,
        hasBackdrop: bottomSheetInfo.hasBackdrop,
        ContentComponent: bottomSheetInfo.ContentComponent,
        bottomSheetFixerStyle: bottomSheetInfo.bottomSheetFixerStyle,
      };
    });
  };
  const closeBottomSheet = () => {
    setOpenedBottomSheet(null);
  };
  const updatePropsBottomSheet = ({
    contentProps,
    backdropProps,
    hasBackdrop,
  }: {
    contentProps?: TContentProps;
    backdropProps?: NonNullable<
      BottomSheetStore<TContentProps>["BottomSheetInfo"]
    >["backdropProps"];
    hasBackdrop?: NonNullable<
      BottomSheetStore<TContentProps>["BottomSheetInfo"]
    >["hasBackdrop"];
  }) => {
    setOpenedBottomSheet((prev) => {
      if (prev === null) {
        console.error("Open BottomSheet First!");
        return prev;
      }
      return {
        ...prev,
        backdropProps: backdropProps || prev.backdropProps,
        contentProps: contentProps || prev.contentProps,
        hasBackdrop: hasBackdrop || prev.hasBackdrop,
      };
    });
  };

  return {
    // openBottomSheet,
    renderBottomSheet,
    closeBottomSheet,
    updatePropsBottomSheet,
  };
};

export default useBottomSheet;
