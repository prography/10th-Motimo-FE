interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => {
  const correctPercentage = `${percentage >= 100 ? 100 : percentage <= 0 ? 0 : percentage}`;
  return (
    <>
      <div className="w-56 h-2 relative bg-Color-gray-10 rounded-[999px] overflow-hidden">
        <div
          className={` h-2 left-0 top-0 absolute bg-indigo-500 rounded-[999px]`}
          style={{ width: `${correctPercentage}%` }}
        ></div>
      </div>
    </>
  );
};
export default ProgressBar;
