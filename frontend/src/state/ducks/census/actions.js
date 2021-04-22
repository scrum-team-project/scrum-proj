import { RESET_FORM, UPDATE_FORM } from "./types";

export const updateForm = (data) => ({
    type: UPDATE_FORM,
    payload: data
});

export const resetForm = () => ({
    type: RESET_FORM,
});