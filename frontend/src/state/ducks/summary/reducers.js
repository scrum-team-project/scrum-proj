import {
    FETCH_SUMMARY,
    SELECT_TO_DISPLAY,
    SELECT_TO_DISPLAY_CITY,
    SELECT_TO_DISPLAY_COMMUNITY,
    SELECT_TO_DISPLAY_DISTRICT,
    SELECT_TO_DISPLAY_REGION,
} from "./types";

const initialState = {
    allData: [],
    displayed: { region: "", district: "", community: "", city: "" },
};

const summaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUMMARY: {
            return { ...state, allData: action.payload };
        }

        case SELECT_TO_DISPLAY_REGION: {
            return {
                ...state,
                displayed: { ...initialState, region: action.payload },
            };
        }
        case SELECT_TO_DISPLAY_DISTRICT: {
            return {
                ...state,
                displayed: {
                    ...state.displayed,
                    district: action.payload,
                    community: "",
                    city: "",
                },
            };
        }
        case SELECT_TO_DISPLAY_COMMUNITY: {
            return {
                ...state,
                displayed: {
                    ...state.displayed,
                    community: action.payload,
                    city: "",
                },
            };
        }
        case SELECT_TO_DISPLAY_CITY: {
            return {
                ...state,
                displayed: { ...state.displayed, city: action.payload },
            };
        }
        default:
            return state;
    }
};

export default summaryReducer;
