"use client";

import { Drawer } from "vaul";
import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";

import CheckSvg from "../../public/check.svg";
import ArrowDownSvg from "../../public/Carrot_Down_MD.svg";
import CalendarSvg from "../../public/Calendar.svg";
import PaperPlaneSvg from "../../public/Paper_Plane.svg";

import TextField from "../../TextField/TextField";
import { Button } from "../../Button/Button";
import Calendar from "../../Calendar/Calendar";

type TodoInfoForSubmission = {
  /** id값이 존재한다면 수정, 없다면 추가로 봐야 함. */
  id?: string;
  todo: string;
  date?: Date; //test
  subGoalTitle: string;
  subGoalId: string;
};

type TodoInfo = {
  id?: TodoInfoForSubmission["todo"];
  todo: TodoInfoForSubmission["todo"];
  date?: TodoInfoForSubmission["date"];
  subGoalTitle?: TodoInfoForSubmission["subGoalTitle"];
  subGoalId?: TodoInfoForSubmission["subGoalId"];
};

const TodoInfoContext = createContext<{
  todoInfo: TodoInfo;
  setTodoInfo: Dispatch<SetStateAction<TodoInfo>>;
} | null>(null);

type TodoBottomSheetProps = {
  initTodoInfo?: undefined | TodoInfoForSubmission;
  subGoals: { title: string; id: string }[];
  onSubmitTodo: (todoInfo: TodoInfoForSubmission) => Promise<boolean>;
  openBottomSheet: boolean;
  isActivated: boolean;
  setIsActivated: (newState: boolean) => void;
} & {
  hasBottomTabBar: boolean;
};

const makeDefaultTodoBottomSheetInfo = (
  subGoals: TodoBottomSheetProps["subGoals"],
  initTodoInfo?: TodoBottomSheetProps["initTodoInfo"],
) => {
  if (initTodoInfo) {
    return {
      id: initTodoInfo?.id,
      todo: initTodoInfo?.todo ?? "",
      date: initTodoInfo?.date,
      subGoalTitle: initTodoInfo?.subGoalTitle ?? subGoals?.[0]?.title,
      subGoalId: initTodoInfo?.subGoalId ?? subGoals?.[0]?.id,
    };
  }
  return {
    id: "",
    todo: "",
    date: undefined,
    subGoalTitle: subGoals[0]?.title ?? "",
    subGoalId: subGoals[0]?.id ?? "",
  };
};

const TodoBottomSheet = ({
  initTodoInfo,
  subGoals,
  onSubmitTodo,
  openBottomSheet,
  isActivated,
  setIsActivated,
  hasBottomTabBar,
}: TodoBottomSheetProps) => {
  const [todoInfo, setTodoInfo] = useState<TodoInfo>(
    makeDefaultTodoBottomSheetInfo(subGoals, initTodoInfo),
  );

  const [visibleSelect, setVisibleSelect] = useState(false);
  const [showDate, setShowDate] = useState(false);

  const inputRef = useRef(null);

  const resetBottomSheet = () => {
    setIsActivated(false);
    setVisibleSelect(false);
    setShowDate(false);
    setTodoInfo(makeDefaultTodoBottomSheetInfo(subGoals));
    inputRef.current && (inputRef.current as HTMLInputElement).blur();
  };

  useEffect(() => {
    setTodoInfo(makeDefaultTodoBottomSheetInfo(subGoals, initTodoInfo));
  }, [initTodoInfo, openBottomSheet]);

  return (
    <>
      <Drawer.Root open={openBottomSheet} defaultOpen={false}>
        <Drawer.Portal>
          {isActivated && (
            <Drawer.Overlay
              onClick={() => {
                resetBottomSheet();
              }}
              className="fixed inset-0 bg-black/20 z-20"
            />
          )}

          <TodoInfoContext.Provider value={{ todoInfo, setTodoInfo }}>
            {/* <div className="flex justify-center w-[100vw]  fixed bottom-0 z-40"> */}
            <div
              className={`flex justify-center w-[100vw]  fixed ${hasBottomTabBar ? "bottom-14" : "bottom-0"} z-30`}
            >
              <Drawer.Content
                className={`              
                w-[360px]
               z-30 pl-4 pr-4  bg-white flex flex-col justify-start   rounded-t-[10px]`}
                style={{
                  height: isActivated ? (showDate ? "382px" : "100px") : "66px", // 고정값 강제
                  transition: "height 0.3s ",
                  bottom: 0,
                }}
              >
                {showDate ? (
                  <BottomSheetDate setShowDate={setShowDate} />
                ) : (
                  <>
                    {visibleSelect && (
                      <div className="relative h-0">
                        <BottomSheetSelectList
                          subGoals={subGoals}
                          setVisibleSelect={setVisibleSelect}
                        />
                      </div>
                    )}
                    <Drawer.Title className="invisible"></Drawer.Title>
                    <section className="w-full h-auto pt-3 pb-3 gap-2 flex flex-col justify-start">
                      {/** title은 접근성 에러 때문에 넣고 invisible 설정함 */}

                      <form
                        className="w-auto h-auto relative flex items-center"
                        // ref={inputRef}
                        onSubmit={async (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (todoInfo.subGoalTitle) {
                            const submitRes = await onSubmitTodo(
                              todoInfo as TodoInfoForSubmission,
                            );

                            submitRes && resetBottomSheet();
                          }
                          // else의 경우 에러 메시지를 넣어야 할 수도 있음
                        }}
                      >
                        <TextField
                          ref={inputRef}
                          onClick={(e) => {
                            todoInfo.id || setIsActivated(true);
                          }}
                          id="buttomSheetTodoTextField"
                          isError={false}
                          value={todoInfo.todo}
                          placeholder="투두를 추가해보세요!"
                          onChange={(e) =>
                            setTodoInfo((prev) => ({
                              ...prev,
                              todo: e.target.value,
                            }))
                          }
                        />
                        <button
                          type="submit"
                          className="w-8 h-8 right-3 absolute bg-background-primary rounded-[999px] inline-flex justify-center items-center"
                        >
                          <div className="w-4 h-4 relative overflow-hidden">
                            <PaperPlaneSvg />
                          </div>
                        </button>
                      </form>
                      <div
                        className={`grid transition-all translate-z-0  transform-3d duration-300 ease-out  overflow-hidden`}
                        style={{
                          // maxHeight: isActivated ? "auto" : "0",
                          // height: isActivated ? "auto" : "0",
                          gridTemplateRows: isActivated ? "1fr" : "0fr",
                        }}
                      >
                        <div className={`min-h-0 overflow-hidden flex w-full`}>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowDate(true)}
                              type="button"
                              className=" h-8 px-2 py-1 bg-background-alternative rounded  outline-1 outline-offset-[-1px] outline-Color-gray-10 inline-flex justify-start items-center gap-[2px]"
                            >
                              <div className="w-4 h-4 relative overflow-hidden">
                                <CalendarSvg />
                              </div>
                              <p className="items-center flex text-label-normal text-xs font-normal font-['SUIT_Variable'] leading-none">
                                {todoInfo.date
                                  ? date2stringSplitByDot(todoInfo.date)
                                  : "날짜 추가"}
                              </p>
                            </button>
                            <button
                              className="self-stretch h-8 w-56 px-3 py-1 bg-background-alternative rounded  outline-1 outline-offset-[-1px] outline-Color-gray-10 inline-flex items-center gap-[2px]"
                              onClick={() => {
                                setVisibleSelect((prev) => !prev);
                              }}
                            >
                              <p className="flex-1 flex justify-start text-label-strong text-xs font-medium font-['SUIT_Variable'] leading-none">
                                {todoInfo.subGoalTitle}
                              </p>
                              <div className="w-4 h-4 relative overflow-hidden"></div>
                              <ArrowDownSvg />
                            </button>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}
              </Drawer.Content>
            </div>
          </TodoInfoContext.Provider>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
export default TodoBottomSheet;

export type { TodoInfoForSubmission, TodoBottomSheetProps };

interface BottomSheetSelectListProps {
  subGoals: TodoBottomSheetProps["subGoals"];
  setVisibleSelect: Dispatch<SetStateAction<boolean>>;
}

const BottomSheetSelectList = ({
  subGoals,
  setVisibleSelect,
}: BottomSheetSelectListProps) => {
  const nullabeTodoInfo = useContext(TodoInfoContext);

  return (
    <>
      <ul className="absolute right-4 bottom-2    z-20 w-43 h-28 p-4 bg-background-alternative rounded-lg inline-flex flex-col justify-start items-center gap-3 overflow-y-auto ">
        {subGoals.map(({ title: subGoalTitle, id: subGoalId }) => {
          const isSelected = nullabeTodoInfo?.todoInfo.subGoalId === subGoalId;
          return (
            <li
              key={subGoalId}
              onClick={() => {
                nullabeTodoInfo &&
                  nullabeTodoInfo.setTodoInfo((prev) => ({
                    ...prev,
                    subGoalTitle: subGoalTitle,
                    subGoalId: subGoalId,
                  }));

                // select 끄기
                setVisibleSelect((prev) => !prev);
              }}
              className={`self-stretch flex  justify-center ${
                isSelected ? "text-background-primary" : "text-label-strong"
              }  text-xs font-medium font-['SUIT_Variable'] leading-none`}
            >
              <p className="flex-1 truncate h-4 flex items-center">
                {subGoalTitle}
              </p>
              {isSelected && (
                <div className="flex justify-center items-center w-4 h-4 relative overflow-hidden text-background-primary">
                  <CheckSvg />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

interface BottomSheetDateProps {
  setShowDate: Dispatch<SetStateAction<boolean>>;
}

const BottomSheetDate = ({ setShowDate }: BottomSheetDateProps) => {
  const nullableTodoInfo = useContext(TodoInfoContext);
  // initDate가 없다면 당일로.
  const [selectedDate, setSelectedDate] = useState(
    nullableTodoInfo?.todoInfo.date ?? new Date(),
  );

  return (
    <section className="flex flex-col gap-6 pt-4 items-center">
      <header className="w-full inline-flex justify-between items-center gap-14">
        <div
          data-leading-icon="false"
          data-status="enabled"
          data-type="text"
          className="h-8 px-2 py-1 relative rounded-lg inline-flex flex-col justify-center items-start gap-2 overflow-hidden"
        >
          <Button
            variant="text"
            className=" text-background-strong"
            size="s"
            onClick={() => setShowDate(false)}
          >
            {"취소"}
          </Button>
        </div>
        <p className="flex-1 text-center justify-start text-label-strong text-xl font-bold font-['SUIT_Variable'] leading-normal">
          날짜
        </p>
        <Button
          variant="filled"
          size="s"
          onClick={() => {
            nullableTodoInfo?.setTodoInfo((prev) => ({
              ...prev,
              date: selectedDate,
            }));
            setShowDate(false);
          }}
        >
          {"완료"}
        </Button>
      </header>
      <Calendar
        selected={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
      />
    </section>
  );
};

/** shared에서의 util이라 걍 여기에 정의함 */
const date2stringSplitByDot = (date: Date) =>
  `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
