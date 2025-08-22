import { Drawer } from "vaul";
import { useState } from "react";
import { CupertinoPicker } from "@/components/shared";
import { SegmentedControl } from "@/components/shared";
import CloseSvg from "@/components/shared/public/Close_SM.svg";
import Calendar from "@/components/shared/Calendar/Calendar";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

interface GoalDurationBottomSheetProps {
  initMonth?: number;
  initDate?: Date;
  // openBottomSheet: boolean;
  setopenBottomSheet: (newOpenBottomSheetStatus: boolean) => void;
  onEdit: (durationInfo: {
    type: "month" | "date";
    value: number | Date;
  }) => void;
}

const GoalDurationBottomSheet = ({
  initDate,
  initMonth,
  // openBottomSheet,
  setopenBottomSheet,
  onEdit,
}: GoalDurationBottomSheetProps) => {
  const [selectedMonth, setSelectedMonth] = useState(initMonth ?? 3);
  const [selectedDate, setSelectedDate] = useState(initDate ?? new Date());
  const [durationType, setDurationType] = useState<"month" | "date">("month");
  return (
    <>
      {/* <Drawer.Root open={openBottomSheet}>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 z-20 bg-neutral-700/50 "
            onClick={() => {
              setopenBottomSheet(false);
            }}
          />
          <div className="flex justify-center w-[100vw] relative"> */}
      <div
        // <Drawer.Content
        className="
          z-30
          
          w-[360px] h-[585px]  bg-background-alternative rounded-tl-lg rounded-tr-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.24)] overflow-hidden
          flex flex-col items-center
          pt-5 pl-4 pr-4 pb-6
          "
        // className="
        //   z-30
        //   bottom-0
        //   w-[360px] h-[585px]  bg-background-alternative rounded-tl-lg rounded-tr-lg shadow-[0px_0px_4px_0px_rgba(0,0,0,0.24)] overflow-hidden
        //   flex flex-col items-center
        //   pt-5 pl-4 pr-4 pb-6
        //   fixed
        //   "
      >
        {/* <Drawer.Title className="invisible"></Drawer.Title> */}
        <div className="h-full flex flex-col justify-between">
          <div className="h-auto flex flex-col gap-6">
            <header className="flex justify-between">
              <p className="justify-start text-label-strong text-xl font-bold font-['SUIT_Variable'] leading-normal">
                목표 기간 수정
              </p>
              <button
                type="button"
                className="w-6 h-6 relative overflow-hidden"
                onClick={() => {
                  setopenBottomSheet(false);
                }}
              >
                <CloseSvg />
              </button>
            </header>
            <section>
              <SegmentedControl
                options={[
                  { label: "개월 수로 설정", value: "month" },
                  { label: "완료 날짜로 설정", value: "date" },
                ]}
                onChange={(newValue) =>
                  setDurationType(newValue as "month" | "date")
                }
                selectedValue={durationType}
              />
            </section>
            <section>
              {durationType === "month" ? (
                <CupertinoPicker
                  items={months}
                  selectedValue={selectedMonth}
                  onValueChange={setSelectedMonth}
                  renderItem={(num) => `${num}`}
                  height={200}
                  itemHeight={40}
                />
              ) : (
                <Calendar selected={selectedDate} onChange={setSelectedDate} />
              )}
            </section>
          </div>
          <button
            onClick={() => {
              onEdit({
                type: durationType,
                value: durationType === "month" ? selectedMonth : selectedDate,
              });
            }}
            type="button"
            data-state="enabled"
            className="w-80 h-14 px-6 py-4 bg-background-strong rounded-[999px] inline-flex justify-center items-center gap-2 overflow-hidden"
          >
            <p className="flex-1 text-center justify-center text-label-inverse text-xl font-bold font-['SUIT'] leading-normal">
              수정
            </p>
          </button>
        </div>
        {/* </Drawer.Content> */}
      </div>
      {/* </div>
        </Drawer.Portal>
      </Drawer.Root> */}
    </>
  );
};
export default GoalDurationBottomSheet;
