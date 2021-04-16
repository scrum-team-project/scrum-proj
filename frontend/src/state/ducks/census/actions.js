import { UPDATE_FORM } from "./types";

export const updateForm = (data) => ({
    type: UPDATE_FORM,
    payload: data
});