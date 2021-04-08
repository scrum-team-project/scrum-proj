import { FETCH_SUMMARY, SELECT_TO_DISPLAY } from "./types";

const initialState = {
    allData: [],
    displayed: {},
};

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUMMARY: {
            return { allData: action.payload, displayed: {} };
        }
        case SELECT_TO_DISPLAY: {
            return { ...state, displayed: action.payload };
        }

        default:
            return state;
    }
};

export default summaryReducer;
