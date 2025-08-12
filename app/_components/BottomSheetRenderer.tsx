"use client";

import { Drawer } from "vaul";
import useBottomSheetStore from "@/stores/useBottomSheetStore";
import { useEffect, useState } from "react";

const BottomSheetRenderer = () => {
  const bottomSheetInfo = useBottomSheetStore((state) => state.BottomSheetInfo);
  const {
    hasBackdrop,
    backdropProps,
    ContentComponent,
    contentProps,
    bottomSheetFixerStyle,
  } = bottomSheetInfo ?? {};
  //test
  console.log("bottomSheetInfo in Renderer: ", bottomSheetInfo);

  const keyCandinates = ["one", "other"];
  const [keyIdx, setKeyIdx] = useState(0);
  const isBottomSheetOpen = !!ContentComponent;

  useEffect(() => {
    if (!hasBackdrop) setKeyIdx((prev) => (prev + 1) % 2);
  }, [hasBackdrop]);

  return (
    <>
      <Drawer.Root
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
            <Drawer.Content>
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
