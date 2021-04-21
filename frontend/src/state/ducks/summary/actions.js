import {
    SELECT_TO_DISPLAY_CITY,
    SELECT_TO_DISPLAY_COMMUNITY,
    SELECT_TO_DISPLAY_DISTRICT,
    SELECT_TO_DISPLAY_REGION,
} from "./types";

export const selectToDisplayRegion = (object) => {
    return { type: SELECT_TO_DISPLAY_REGION, payload: object };
};

export const selectToDisplayDistrict = (object) => {
    return { type: SELECT_TO_DISPLAY_DISTRICT, payload: object };
};
export const selectToDisplayCommunity = (object) => {
    return { type: SELECT_TO_DISPLAY_COMMUNITY, payload: object };
};
export const selectToDisplayCity = (object) => {
    return { type: SELECT_TO_DISPLAY_CITY, payload: object };
};
