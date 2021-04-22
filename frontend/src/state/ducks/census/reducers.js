import { CENSUS_FAILURE, CENSUS_REQUEST, CENSUS_SUCCESS, RESET_FORM, UPDATE_FORM } from "./types";

const initialState = {
    sentSuccessfully: false,
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
        town: "",
        street: "",
        number: "",
    },
    registeredAddress: {
        voivodeship: "",
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
            return {
                ...state,
                sentSuccessfully: true
            }
        }
        case CENSUS_FAILURE: {
            return state
        }

        case CENSUS_REQUEST: {
            return {
                ...state,
                sentSuccessfully: "pending"
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