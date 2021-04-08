import { createAction } from "redux-api-middleware";
import types from "./types";

const login = (login, password) => (dispatch) => {
    console.log("LOGIN REQUEST");
    dispatch(
        createAction({
            endpoint: "http://localhost:5000/api/login",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
            types: [
                types.LOGIN_REQUEST,
                types.LOGIN_SUCCESS,
                types.LOGIN_FAILURE,
            ],
        })
    );
};

const operations = {
    login,
};

export default operations;
