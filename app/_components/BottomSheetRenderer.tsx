"use client";

import { Drawer } from "vaul";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import { useEffect, useState } from "react";

const BottomSheetRenderer = () => {
  const bottomSheetInfoHistory = useBottomSheetStore(
    (state) => state.BottomSheetInfoHistory,
  );
  const {
    hasBackdrop,
    backdropProps,
    ContentComponent,
    contentProps,
    bottomSheetFixerStyle,
  } = bottomSheetInfoHistory?.[bottomSheetInfoHistory.length - 1] ?? {};

  const keyCandinates = ["one", "other"];
  const [keyIdx, setKeyIdx] = useState(0);
  const isBottomSheetOpen = !!ContentComponent;

  useEffect(() => {
    if (!hasBackdrop) setKeyIdx((prev) => (prev + 1) % 2);
  }, [hasBackdrop]);

  useEffect(() => {
    if (!window?.visualViewport) return;

    const handleMobileKeyboardResize = () => {
      const bottomSheet = document.querySelector(
        // "#fixer",
        "#bottom-sheet",
      ) as HTMLDivElement;
      if (!bottomSheet) return;
      const keyboardHeight = window.innerHeight - window.visualViewport!.height;

      // 키보드가 올라온 경우
      if (keyboardHeight > 0) {
        bottomSheet.style.transform = `translateY(-${keyboardHeight}px)`;
      }
      // 키보드가 내려간 경우
      else {
        bottomSheet.style.transform = "translateY(0px)";
      }
    };
    window.visualViewport.addEventListener(
      "resize",
      handleMobileKeyboardResize,
    );
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleMobileKeyboardResize,
        );
      }
    };
  }, [bottomSheetFixerStyle?.bottom]);

  return (
    <>
      <Drawer.Root
        key={`${ContentComponent}`}
        open={isBottomSheetOpen}
        defaultOpen={false}
        handleOnly
        disablePreventScroll={isBottomSheetOpen && !hasBackdrop}
      >
        <Drawer.Portal>
          {hasBackdrop && <Drawer.Overlay {...backdropProps}></Drawer.Overlay>}
          <div
            className={
              `flex justify-center w-[100vw]  fixed  bottom-14 z-30` /* 바텀탭바 따라 높이 조절은 일단 나중에..*/
            }
            style={bottomSheetFixerStyle}
          >
            <Drawer.Content id="bottom-sheet">
              <Drawer.Title className="invisible"></Drawer.Title>

              {isBottomSheetOpen && (
                <ContentComponent
                  key={keyCandinates[keyIdx]}
                  {...contentProps}
                />
              )}
            </Drawer.Content>
          </div>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
export default BottomSheetRenderer;
