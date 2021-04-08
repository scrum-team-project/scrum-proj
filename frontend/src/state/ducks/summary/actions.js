import { SELECT_TO_DISPLAY } from "./types";

export const selectToDisplay = (object) => {
    return { type: SELECT_TO_DISPLAY, payload: object };
};
