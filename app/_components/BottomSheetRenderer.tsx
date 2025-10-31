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

  // useEffect(() => {
  //   if (!window?.visualViewport) return;

  //   const handleMobileKeyboardResize = () => {
  //     const bottomSheet = document.querySelector(
  //       // "#fixer",
  //       "#bottom-sheet",
  //     ) as HTMLDivElement;
  //     if (!bottomSheet) return;
  //     const keyboardHeight = window.innerHeight - window.visualViewport!.height;

  //     // 키보드가 올라온 경우
  //     if (keyboardHeight > 0) {
  //       bottomSheet.style.transform = `translateY(-${keyboardHeight}px)`;
  //     }
  //     // 키보드가 내려간 경우
  //     else {
  //       bottomSheet.style.transform = "translateY(0px)";
  //     }
  //   };
  //   window.visualViewport.addEventListener(
  //     "resize",
  //     handleMobileKeyboardResize,
  //   );
  //   return () => {
  //     if (window.visualViewport) {
  //       window.visualViewport.removeEventListener(
  //         "resize",
  //         handleMobileKeyboardResize,
  //       );
  //     }
  //   };
  // }, [bottomSheetFixerStyle?.bottom]);

  const [styleByVisualViewport, setStyleByVisualViewport] = useState({});
  useEffect(() => {
    const handleViewportResize = () => {
      if (window.visualViewport) {
        // 현재 뷰포트의 높이를 가져옵니다.
        const viewportHeight = window.visualViewport.height;
        // 전체 창의 높이
        const windowHeight = window.innerHeight;

        // 키보드가 올라왔을 때 (뷰포트 높이가 창 높이보다 작아질 때)
        if (viewportHeight < windowHeight) {
          const keyboardHeight = windowHeight - viewportHeight;
          setStyleByVisualViewport({
            transform: `translateY(-${keyboardHeight}px)`,
            transition: "transform 0s ease-out",
          });
        } else {
          // 키보드가 내려갔을 때
          setStyleByVisualViewport({
            transform: "translateY(0)",
            transition: "transform 0.3s ease-out",
          });
        }
      }
    };

    // visualViewport가 지원되는 환경에서만 이벤트 리스너를 추가합니다.
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleViewportResize);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          handleViewportResize,
        );
      }
    };
  }, []);

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
            style={{ ...bottomSheetFixerStyle, ...styleByVisualViewport }}
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
