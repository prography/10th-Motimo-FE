interface GoalMenuProps {
  goal: string;
  percentage: number;
}

const GoalMenu = ({ goal, percentage }: GoalMenuProps) => {
  return (
    <>
      <div>
        <p>{goal}</p>
        <div className="bg-gray-300 w-full">
          <div
            className="bg-black"
            // 혹시 100% 넘어갈까봐
            style={{ width: `${percentage > 100 ? 100 : percentage}%` }}
          ></div>
        </div>
        <p>{`${percentage}%`}</p>
      </div>
    </>
  );
};
export default GoalMenu;
