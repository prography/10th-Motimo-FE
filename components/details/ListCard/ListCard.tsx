import RightArrowSvg from "@/components/shared/public/Chevron_Right_MD.svg";
import LeftArrowSvg from "@/components/shared/public/Chevron_Left_MD.svg";
import { l } from "msw/lib/core/HttpResponse-CCdkF1fJ";
import TodoItem from "@/components/shared/TodoItem/TodoItem";

const ListCard = () => {
  const subGoalName = "";
  const totalTodoLen = 10;
  const checkedTodoLen = 9;
  return (
    <>
      <main className="w-96 flex-1 p-4 bg-background-alternative inline-flex flex-col justify-start items-center gap-2 overflow-hidden">
        <section>
          <button className="w-8 h-8 bg-background-normal rounded inline-flex justify-center items-center gap-2">
            <div className="w-6 h-6 relative overflow-hidden">
              <RightArrowSvg />
            </div>
          </button>
          <p className="self-stretch text-center justify-center text-label-strong text-base font-medium font-['SUIT_Variable'] leading-snug">
            {subGoalName}
          </p>

          <button className="w-8 h-8 bg-background-normal rounded inline-flex justify-center items-center gap-2">
            <div className="w-6 h-6 relative overflow-hidden">
              <LeftArrowSvg />
            </div>
          </button>
        </section>
        <section className="self-stretch inline-flex justify-end items-center gap-0.5">
          <p className="justify-center text-label-alternative text-sm font-medium font-['SUIT_Variable'] leading-tight">
            {`${checkedTodoLen}/${totalTodoLen}`}
          </p>
        </section>
        <section>{/* <TodoItem /> */}</section>
      </main>
    </>
  );
};
export default ListCard;
