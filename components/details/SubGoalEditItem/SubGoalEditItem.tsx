"use client";

import EditSvg from "@/public/images/Edit_Pencil_01.svg";
import TrashBinSvg from "@/public/images/Trash_Full.svg";
import DraggableSvg from "@/public/images/Draggable.svg";
interface SubGoalEditItemProsp {
  onEdit: () => void;
  onDelete: () => void;
  subGoalTitle: string;
}

const SubGoalEditItem = ({
  onDelete,
  onEdit,
  subGoalTitle,
}: SubGoalEditItemProsp) => {
  return (
    <>
      <div className="w-80 h-14 p-2 bg-background-alternative rounded-lg  outline-1 outline-offset-[-1px] outline-line-normal inline-flex flex-col justify-center items-start">
        <div className="w-6 h-6 relative overflow-hidden">
          <DraggableSvg />
        </div>
        <p class="self-stretch justify-start text-label-normal text-sm font-medium font-['SUIT_Variable'] leading-tight">
          {subGoalTitle}
        </p>
        <div>
          <button
            onClick={() => onEdit()}
            type="button"
            className="w-8 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div class="w-5 h-5 relative overflow-hidden">
              <EditSvg />
            </div>
          </button>
          <button
            onClick={() => onDelete()}
            type="button"
            className="w-8 h-8 p-2 bg-background-normal rounded inline-flex justify-center items-center gap-2"
          >
            <div class="w-5 h-5 relative overflow-hidden">
              <TrashBinSvg />
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
export default SubGoalEditItem;
