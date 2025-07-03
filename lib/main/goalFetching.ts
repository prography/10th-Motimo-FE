import { templateFetch } from "@/lib/common/fetchTemplate";
import {
  GoalCreateRq,
  GoalDetailRs,
  GoalListRs,
  GoalUpdateRq,
  GoalWithSubGoalTodoRs,
  SubGoalCreateRq,
} from "@/api/generated/motimo/Api";

const updateGoal = async (goalId: string, newGoalInfo: GoalUpdateRq) => {
  templateFetch;
  // error처리 아직 안함. toast처리 해야 함
  const result = await templateFetch(`/v1/goals/${goalId}`, "PUT", newGoalInfo);

  // 타입 변환 해야할 수도
  return result;
};

const getAllGoals = async () => {
  const result = await templateFetch<GoalListRs>("/v1/goals", "GET");

  return result;
};

const createNewGoal = async (newGoalInfo: GoalCreateRq) => {
  const result = await templateFetch(`/v1/goals`, "POST", newGoalInfo);

  return result;
};

const createNewSubGoalOnGoal = async (
  goalId: string,
  newSubGoal: SubGoalCreateRq,
) => {
  const result = await templateFetch(
    `/v1/goals/${goalId}/subGoal`,
    "POST",
    newSubGoal,
  );
  return result;
};

const toggleGoalCompletion = async (goalId: string) => {
  const result = await templateFetch(`/v1/goals/${goalId}/completion`, "PATCH");
  return result;
};

const getGoal = async (goalId: string) => {
  const result = await templateFetch<GoalDetailRs>(
    `/v1/goals/${goalId}`,
    "GET",
  );

  return result;
};

const getGoalWithSubGoalTodo = async (goalId: string) => {
  const result = await templateFetch<GoalWithSubGoalTodoRs>(
    `/v1/goals/${goalId}/sub-goals/all`,
    "GET",
  );

  return result;
};

export {
  updateGoal,
  getAllGoals,
  createNewGoal,
  createNewSubGoalOnGoal,
  toggleGoalCompletion,
  getGoal,
  getGoalWithSubGoalTodo,
};
