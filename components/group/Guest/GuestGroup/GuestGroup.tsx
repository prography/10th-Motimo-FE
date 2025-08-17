"use client";
import { motion, AnimatePresence } from "motion/react";
import { GroupChatItem } from "@/components/group";
import { useState } from "react";
import { AppBar } from "@/components/shared";
import { Button } from "@/components/shared/Button/Button";

const diaryText = `다양한 툴을 익히기 위해...`;
const previewFirstMessage = `투두를 완료하거나, 기록을 남겼을 때
그룹원들에게 공유됩니다.`;
const previewSecondMessage = `그룹원들의 투두 달성과 기록을 확인하고,
리액션을 통해 서로 동기부여를 할 수 있어요!`;

const previewMsgs = [previewFirstMessage, previewSecondMessage];

const PreviewFirstContent = () => {
  return (
    <div className="flex flex-col gap-6">
      <GroupChatItem
        id=""
        mainText="투두를 완료했어요!"
        style="todo"
        type="me"
        userName="홍길동"
        checkboxLabel="프레이머 공부하기"
        hasUserReacted={false}
      />
      <GroupChatItem
        id=""
        mainText="투두 기록을 남겼어요!"
        style="todo"
        type="me"
        userName="홍길동"
        checkboxLabel="프레이머 공부하기"
        diaryText={diaryText}
        hasUserReacted={false}
      />
    </div>
  );
};

const PreviewSecondContent = () => {
  return (
    <div className="flex flex-col gap-6 w-[296px]">
      <GroupChatItem
        id=""
        mainText="투두를 완료했어요!"
        style="todo"
        type="member"
        userName="김모티"
        checkboxLabel="프레이머 공부하기"
        hasUserReacted={false}
      />
      <GroupChatItem
        id=""
        mainText="김모티님의 투두에 반응을 남겼어요!"
        style="reaction"
        type="me"
        userName="홍길동"
        checkboxLabel="프레이머 공부하기"
        reactionType="best"
      />
    </div>
  );
};

const previewContents = [PreviewFirstContent, PreviewSecondContent];

const GuestAttrMsg = `혼자 하는 것보다 같이 하면
그룹 달성률이 높아져요!`;

interface GuestGroupProps {
  onClickLogin: () => void;
}

const GuestGroup = ({ onClickLogin }: GuestGroupProps) => {
  const [previewIdx, setPreviewIdx] = useState(0);
  const [directionNext, setDirectionNext] = useState(true);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50; // 드래그 거리 기준을 조금 늘림
    const { offset } = info;

    // 오른쪽으로 드래그 (이전 카드)
    if (offset.x > threshold && previewIdx > 0) {
      setDirectionNext(false);
      setPreviewIdx(previewIdx - 1);
    }
    // 왼쪽으로 드래그 (다음 카드)
    else if (offset.x < -threshold && previewIdx < 1) {
      setDirectionNext(true);
      setPreviewIdx(previewIdx + 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  const PreviewContentsComp = previewContents[previewIdx];
  return (
    <>
      <div
        className={`min-h-screen pb-14 bg-background-alternative flex flex-col`}
      >
        {/* App Bar */}
        <AppBar title="그룹" type="main" />
        <main className="w-full flex flex-col items-center pt-6 justify-between pb-6 flex-1">
          <div className="w-full flex flex-col items-center">
            <h2 className="whitespace-pre-wrap w-80 text-center justify-center text-black text-xl font-bold font-['SUIT_Variable'] leading-normal">
              {GuestAttrMsg}
            </h2>

            <div className="flex flex-col items-center w-full gap-10">
              <section className="w-full flex flex-col items-center gap-10 relative h-100 pl-8 pr-8 pt-8">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={previewIdx}
                    custom={directionNext}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit={"exit"}
                    transition={{
                      x: { type: "spring", stiffness: 500, damping: 20 },
                      opacity: { duration: 0.1 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    className="cursor-grab active:cursor-grabbing absolute"
                    whileDrag={{ cursor: "grabbing" }}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex flex-col w-full gap-10">
                      <PreviewContentsComp />
                      <p className="whitespace-pre-wrap text-center self-stretch justify-center text-black text-base font-bold font-['SUIT_Variable'] leading-tight">
                        {previewMsgs[previewIdx]}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </section>
              <div className="flex gap-2 ">
                <div
                  className={`rounded-full w-2 h-2 ${previewIdx === 0 ? "bg-background-primary" : "bg-background-assistive"}`}
                ></div>
                <div
                  className={`rounded-full w-2 h-2 ${previewIdx === 1 ? "bg-background-primary" : "bg-background-assistive"}`}
                ></div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => onClickLogin()}
            className="w-50 cursor-pointer"
            size="l"
            type="button"
            variant="filled"
          >
            <p className="leading-normal tracking-[-1px]">
              로그인 후 그룹 참여하기
            </p>
          </Button>
        </main>
      </div>
    </>
  );
};

export default GuestGroup;
