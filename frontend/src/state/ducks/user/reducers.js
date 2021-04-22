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
            console.log(action.payload)
            return {
                login: action.payload.login,
                password: action.payload.password,
                loggedIn: true
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