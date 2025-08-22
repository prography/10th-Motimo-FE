import { Drawer } from "vaul";
import CloseSvg from "@/components/shared/public/Close_SM.svg";
import CloseCircleSvg from "@/components/shared/public/close_circle.svg";
import PlusSvg from "@/components/shared/public/Add_Plus.svg";
import { useState } from "react";
import Image from "next/image";

type TodoResult = {
  emotion:
    | "PROUD"
    | "ROUTINE"
    | "REGRETFUL"
    | "IMMERSED"
    | "SELF_REFLECTION"
    | null;
  file: File | null;
  fileName: string;
  memo: string;
  imagePreviewUrl?: string;
};
const emotionMaps = {
  PROUD: { title: "뿌듯", bg: "bg-Color-blue-30" },
  ROUTINE: { title: "루틴", bg: "bg-Color-primary-30" },
  IMMERSED: { title: "몰입", bg: "bg-Color-yellow-30" },
  REGRETFUL: { title: "아쉬움", bg: "bg-Color-red-30" },
  SELF_REFLECTION: { title: "성찰", bg: "bg-background-strong" },
};

interface TodoResultBottomSheetProps {
  openBottomSheet: boolean;
  setOpenBottomSheet: (nextIsOpen: boolean) => void;
  onSubmit: (todoResult: TodoResult) => Promise<void>;
  // hasBottomTabBar: boolean;
}

const initTodoResult = {
  emotion: null,
  file: null,
  fileName: "",
  memo: "",
};

const TodoResultBottomSheet = ({
  openBottomSheet,
  setOpenBottomSheet,
  onSubmit,
  // hasBottomTabBar,
}: TodoResultBottomSheetProps) => {
  const [todoResult, setTodoResult] = useState<TodoResult>(initTodoResult);

  const resetBottomSheet = () => {
    setOpenBottomSheet(false);
    // setTodoResult(initTodoResult);
  };

  return (
    <>
      {/* <Drawer.Root open={openBottomSheet} defaultOpen={false}>
        <Drawer.Portal>
          <Drawer.Overlay
            onClick={() => {
              resetBottomSheet();
            }}
            className="fixed inset-0 bg-black/10 z-20"
          />

          <div className="flex justify-center w-[100vw] fixed bottom-0 z-40"> */}
      {/* <Drawer.Content */}
      <div
        className={`
                 
                
                w-[360px]
                z-40 p-4   bg-background-alternative rounded-tl-lg rounded-tr-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.24)] overflow-hidden
                flex flex-col gap-6 justify-start
                `}
        // className={`

        //         w-[360px]
        //         z-40 p-4  absolute bg-background-alternative rounded-tl-lg rounded-tr-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.24)] overflow-hidden
        //         flex flex-col gap-6 justify-start
        //         `}
      >
        {/* <Drawer.Title style={{ display: "none" }}></Drawer.Title> */}
        <header className="flex flex-col gap-1">
          <section className="flex justify-between">
            <p className="justify-start text-label-strong text-xl font-bold font-['SUIT'] leading-normal">
              투두 기록 남기기
            </p>
            <button
              className="flex justify-center items-center"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                resetBottomSheet();
              }}
            >
              <div className="flex justify-center items-center w-6 h-6 relative overflow-hidden text-label-alternative">
                <CloseSvg />
              </div>
            </button>
          </section>
          <p className="justify-start text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            남기고 싶은 기록만 남기셔도 괜찮아요!
          </p>
        </header>
        <form
          className="flex flex-col gap-10"
          id="todoResult"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit(todoResult);
          }}
        >
          <section className="flex flex-col gap-3">
            <p className="justify-start text-label-normal text-sm font-bold font-['SUIT'] leading-tight">
              투두를 진행 후 어떤 생각이 드셨나요?
            </p>
            <div className="flex gap-[10px]">
              {Object.entries(emotionMaps).map(
                ([emotionType, { bg, title }]) => {
                  const isNotSeleced =
                    todoResult.emotion && todoResult.emotion !== emotionType;
                  return (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setTodoResult((prev) => ({
                          ...prev,
                          emotion:
                            (emotionType as unknown as TodoResult["emotion"]) ===
                            prev.emotion
                              ? null
                              : (emotionType as unknown as TodoResult["emotion"]),
                        }));
                      }}
                      key={emotionType}
                      className={`w-14 h-14 relative flex justify-center items-center rounded-lg overflow-hidden ${bg} ${isNotSeleced ? "opacity-20" : ""}`}
                    >
                      <p className="text-label-inverse text-sm font-bold font-['SUIT'] leading-tight">
                        {title}
                      </p>
                    </button>
                  );
                },
              )}
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <p className="justify-start text-label-normal text-sm font-bold font-['SUIT'] leading-tight">
              관련 자료를 첨부할 수 있어요.
            </p>
            {todoResult.file ? (
              <>
                {todoResult.imagePreviewUrl ? (
                  <div className="w-fit h-fit rounded  outline-1 outline-offset-[-1px] outline-line-normal relative">
                    <Image
                      src={todoResult.imagePreviewUrl}
                      alt={todoResult.fileName}
                      width={80}
                      height={80}
                    />
                    <button
                      onClick={() => {
                        setTodoResult((prev) => ({
                          ...prev,
                          file: null,
                          fileName: "",
                          imagePreviewUrl: undefined,
                        }));
                      }}
                      type="button"
                      className="w-4 h-4 absolute top-0 right-0"
                      style={{ color: "#171719" }}
                    >
                      <CloseCircleSvg />
                    </button>
                  </div>
                ) : (
                  <div className="pl-4 pr-3 w-fit py-2 relative bg-background-normal rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow-hidden">
                    <div className="self-stretch inline-flex justify-center items-center gap-2">
                      <p className="truncate justify-start text-label-normal text-sm font-bold font-['SUIT'] leading-tight">
                        {todoResult.fileName ?? ""}
                      </p>
                      <button
                        onClick={() => {
                          setTodoResult((prev) => ({
                            ...prev,
                            file: null,
                          }));
                        }}
                        type="button"
                        className="w-8 h-8 flex justify-center items-center"
                      >
                        <div className="w-6 h-6 relative overflow-hidden">
                          <CloseSvg />
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <label
                // type="button"
                htmlFor="file"
                className="px-4 py-2 w-fit relative bg-background-normal rounded-lg inline-flex  justify-center items-center gap-2 "
              >
                <div className="w-6 h-6 relative  text-label-normal">
                  <PlusSvg width={24} height={24} />
                </div>
                <p className="justify-start w-fit text-label-normal text-sm font-semibold font-['Pretendard'] leading-tight">
                  파일 추가하기
                </p>
                <input
                  id="file"
                  name="file"
                  type="file"
                  className="w-0 h-0"
                  // style={{ display: "none" }}
                  onChange={(e) => {
                    const newFile = e.target.files?.[0] ?? null;
                    const fileName = newFile ? newFile.name : "";

                    const isImage =
                      e.target.files?.[0].type.startsWith("image");

                    const imageUrl = newFile
                      ? URL.createObjectURL(newFile)
                      : undefined;

                    setTodoResult((prev) => ({
                      ...prev,
                      file: newFile,
                      fileName,
                      imagePreviewUrl: isImage ? imageUrl : undefined,
                    }));
                  }}
                />
              </label>
            )}
          </section>
          <section className="flex flex-col gap-3">
            <p className="justify-start text-label-normal text-sm font-bold font-['SUIT'] leading-tight">
              짧은 설명이나 메모를 남겨보세요.
            </p>
            {/* <label className="w-80 h-28 px-3 py-2 bg-background-normal rounded-lg  outline-1 outline-offset-[-1px] outline-Color-gray-10 inline-flex justify-center items-center gap-2 overflow-hidden"> */}
            <div>
              <textarea
                maxLength={300}
                onChange={(e) => {
                  setTodoResult((prev) => ({
                    ...prev,
                    memo: e.target.value,
                  }));
                }}
                className={
                  `placeholder:text-gray-400 text-label-strong resize-none w-full h-28 bg-background-normal rounded-lg  outline-1 outline-offset-[-1px] outline-Color-gray-10 overflow-auto  text-sm font-normal font-['Pretendard'] leading-tight px-3 py-2 whitespace-pre-wrap`
                  // "w-full h-28 px-3 py-2 bg-background-normal rounded-lg  outline-1 outline-offset-[-1px] outline-Color-gray-10 inline-flex justify-center items-center gap-2 overflow-auto" +
                  // "whitespace-pre-wrap flex-1 self-stretch justify-start text-gray-400 text-sm font-normal font-['Pretendard'] leading-tight"
                }
                placeholder="메모를 작성해보세요."
              />
              <p className="flex justify-end text-gray-400 text-sm font-normal font-['Pretendard'] leading-tight">{`${todoResult.memo.length}/300`}</p>
            </div>
            {/* </label> */}
          </section>
        </form>

        <button
          type="submit"
          form="todoResult"
          disabled={!todoResult.emotion}
          className={`w-80 h-14 px-6 py-4 ${!todoResult.emotion ? " bg-background-disabled" : "bg-background-strong"}  rounded-[999px] inline-flex justify-center items-center gap-2 overflow-hidden`}
        >
          <p
            className={`flex-1 text-center justify-center ${!todoResult.emotion ? " text-label-disabled " : "text-label-inverse"}  text-xl font-bold font-['SUIT'] leading-normal`}
          >
            확인
          </p>
        </button>
      </div>
      {/* </Drawer.Content> */}
      {/* </div>
        </Drawer.Portal>
      </Drawer.Root> */}
    </>
  );
};

export default TodoResultBottomSheet;
