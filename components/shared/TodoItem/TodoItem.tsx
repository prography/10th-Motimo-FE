import { useState } from "react";
interface TodoItemProps {
  checkedInitial: boolean;
  title: string;
  moodInitial?: number; // 아마 id로 주어질 듯?
  date: Date;
}

const TodoItem = ({
  checkedInitial,
  title,
  moodInitial,
  date,
}: TodoItemProps) => {
  const [checked, setChecked] = useState(checkedInitial);
  const dateString =
    new Date().getDate() - date.getDate() == 1
      ? `어제`
      : `
  ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

  return (
    <>
      <div>
        <label
          htmlFor="todoItem"
          onClick={(e) => {
            // 기획 보니까, 취소는 바로. -> 낙관적 업뎃?
            // 체크는 결과물 제출 바텀 시트 필요?
            setChecked((prev) => !prev);
          }}
        >
          <div>
            <div>
              <input id="todoItem" type="checkbox" checked={checked} />
              <p className="overflow-hidden, text-ellipsis, whitespace-nowrapl">
                {title}
              </p>
            </div>
            {moodInitial && (
              <div
                onClick={() => {
                  // 아마 감정이랑 다른 것도 바꿀 수 있는 바텀시트 필요할수도
                }}
              >
                {moodInitial}
              </div>
            )}
          </div>
          {date && <p>{dateString}</p>}
        </label>
      </div>
    </>
  );
};
export default TodoItem;
