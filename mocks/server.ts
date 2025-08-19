import { setupServer } from "msw/node";
// import { handlers } from "./handlers";
import guestHandlers from "./guestMode/handlers";

export const server = setupServer(...guestHandlers);
