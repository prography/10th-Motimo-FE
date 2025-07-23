"use client";

import EditSvg from "@/public/images/Edit_Pencil_01.svg";
import TrashBinSvg from "@/public/images/Trash_Full.svg";
import DraggableSvg from "@/public/images/Draggable.svg";
interface SubGoalEditItemProps {
  onEdit: () => void;
  onDelete: () => void;
  subGoalTitle: string;
}

const SubGoalEditItem = ({
  onDelete,
  onEdit,
  subGoalTitle,
}: SubGoalEditItemProps) => {
  return (
    <>
      <div className="w-full gap-1  h-14 p-2 bg-background-alternative rounded-lg  outline-1 outline-offset-[-1px] outline-line-normal flex  justify-start items-center">
        <div className="w-6 h-6 relative ">
          <DraggableSvg />
        </div>
        <p
          className="flex-1 flex items-center justify-start  text-label-normal text-sm font-medium font-['SUIT_Variable'] leading-tight"
          style={{ lineHeight: "normal" }}
        >
          {subGoalTitle}
        </p>
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit()}
            type="button"
            className="w-8 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div className="w-5 h-5 relative  text-background-strong">
              <EditSvg />
            </div>
          </button>
          <button
            onClick={() => onDelete()}
            type="button"
            className="w-8 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div className="w-5 h-5 relative ">
              <TrashBinSvg />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
export default SubGoalEditItem;
