import { CENSUS_FAILURE, CENSUS_REQUEST, CENSUS_SUCCESS, RESET_FORM, UPDATE_FORM } from "./types";

const initialState = {
    firstName: "",
    lastName: "",
    id: "",
    sex: "",
    dateOfBirth: new Date().toISOString().split("T")[0],
    education: "",
    maritalStatus: "",
    spouse: "",
    kids: [],
    address: {
        voivodeship: "",
        district: "",
        community: "",
        town: "",
        street: "",
        number: "",
    },
    registeredAddress: {
        voivodeship: "",
        district: "",
        community: "",
        town: "",
        street: "",
        number: "",
    },
    workplace: "",
    worktype: "",
    typeOfEmploymentContract: "",
    earnings: 0,
    nationality: "",
    disabled: false,
};

const censusFormReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case UPDATE_FORM: {
            return {
                ...state,
                ...action.payload
            }
        }

        case CENSUS_SUCCESS: {
            return initialState
        }
        case CENSUS_FAILURE: {
            return state
        }

        case CENSUS_REQUEST: {
            return {
                ...state,
            }
        }

        case RESET_FORM: {
            return initialState
        }

        default:
            return state
    }
}

export default censusFormReducer;