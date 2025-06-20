import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api/goals", () => {
    return HttpResponse.json({
      data: {
        name: "handongryong",
        age: 25,
      },
    });
  }),
];
