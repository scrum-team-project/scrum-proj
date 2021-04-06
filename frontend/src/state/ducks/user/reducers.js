import types from "./types";

const initialState = {
    login: "",
    password: "",
    loggedIn: false,
    message: ""
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            return {
                login: action.payload.login,
                password: action.payload.password,
                loggedIn: true
            }
        }
        case types.LOGIN_FAILURE: {
            return {
                ...state,
                message: "Niepoprawne dane logowania"
            }
        }

        case types.LOGIN_REQUEST: {
            return state
        }

        default:
            return state
    }
}

export default loginReducer;