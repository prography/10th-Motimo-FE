import { http, HttpResponse } from "msw";
import { myMainDB } from "./db";

const pointsHandlers = [
  http.get("/v1/points", () => {
    const pointValue = myMainDB.points.value;
    return HttpResponse.json({
      point: pointValue,
    });
  }),
];
export default pointsHandlers;
