import { setupWorker } from "msw/browser";
// import { handlers } from "./handlers";
import guestHandlers from "./guestMode/handlers";

export const worker = setupWorker(...guestHandlers);
