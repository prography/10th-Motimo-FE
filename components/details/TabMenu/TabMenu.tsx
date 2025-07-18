"use client";

interface TabMenuProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const TabMenu = ({ title, isActive, onClick }: TabMenuProps) => {
  return (
    <>
      <div
        onClick={() => onClick()}
        className="w-full  h-12 px-4 py-2 relative inline-flex justify-center items-center gap-2"
      >
        <div
          className={`flex-1 text-center justify-center  
            ${isActive ? "text-label-normal font-bold" : "text-label-alternativefont-normal"}
             text-base font-['SUIT_Variable'] leading-tight`}
        >
          {title}
        </div>
        <div
          className={`w-44 ${
            isActive
              ? "h-0.5 left-[-1px] top-[46px] absolute bg-line-strong"
              : "h-px left-0 top-[47px] absolute bg-line-normal"
          }`}
        ></div>
      </div>
    </>
  );
};
export default TabMenu;
