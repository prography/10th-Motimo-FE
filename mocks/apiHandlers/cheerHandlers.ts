import { http, HttpResponse } from "msw";
import { myMainDB } from "./db";

const cheerHandlers = [
  http.get("/v1/cheers", () => {
    const cheerPhrase = myMainDB.cheer.default;
    return HttpResponse.json({
      cheerPhrase,
    });
  }),
];
export default cheerHandlers;
