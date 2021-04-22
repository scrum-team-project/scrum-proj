import types from "./types";

const initialState = {
    login: "",
    password: "",
    loggedIn: false,
    message: "",
    isAdmin: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS: {
            console.log(action);
            return {
                ...state,
                loggedIn: true,
                isAdmin: false
            }
        }
        case types.LOGIN_ADMIN_SUCCESS: {
            console.log(action);
            return {
                ...state,
                loggedIn: true,
                isAdmin: true
            }
        }
        case types.LOGIN_FAILURE: {
            console.log(action.payload)
            return {
                ...state,
                message: "Niepoprawne dane logowania"
            }
        }

        case types.LOGIN_REQUEST: {
            console.log(action.payload)
            return state
        }

        default:
            return state
    }
}

export default loginReducer;
