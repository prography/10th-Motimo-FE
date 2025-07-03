import { HttpResponse, delay, http } from "msw";
import { todo } from "node:test";
import goalHandlers from "./apiHandlers/goalHandlers";
import todoHandlers from "./apiHandlers/todoHandlers";
import subGoalHandlers from "./apiHandlers/subGoalHandlers";
import cheerHandlers from "./apiHandlers/cheerHandlers";
import pointsHandlers from "./apiHandlers/pointsHandlers";

export const handlers = [
  /** Goals */
  ...goalHandlers,

  /** Todos */
  ...todoHandlers,

  /** subGoals */
  ...subGoalHandlers,

  /** cheer */
  ...cheerHandlers,

  /** points */
  ...pointsHandlers,
];
