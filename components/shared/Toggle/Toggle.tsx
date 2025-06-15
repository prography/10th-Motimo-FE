interface ToggleProps {
  isOn: boolean;
  onChange: (prevState: boolean) => void;
}

const Toggle = ({ isOn, onChange }: ToggleProps) => {
  /**
   * transition이든 해서 애니메이션 넣어야 함.
   * 동그라미 이동시키는거랑 색 변하는거 전부 애니메이션 넣기.
   */
  return (
    <>
      <div
        onClick={() => onChange(isOn)}
        className={`transition-colors  duration-300 w-10 h-6 relative ${isOn ? "bg-background-primary" : "bg-background-assistive"}  rounded-[999px]`}
      >
        {/**left-[20px] */}
        <div
          className={`transition-transform duration-300 w-4 h-4 ${isOn ? "translate-x-[20px]" : "translate-x-[4px]"}   top-[4px] absolute bg-Color-white rounded-[999px]`}
        ></div>
      </div>
    </>
  );
};
export default Toggle;
