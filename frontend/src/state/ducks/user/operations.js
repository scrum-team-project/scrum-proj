import { createAction } from "redux-api-middleware";
import types from "./types";

const login = (login, password, isAdmin) => (dispatch) => {
    if(isAdmin) {
        dispatch(
            createAction({
                endpoint: "http://localhost:5000/accounts/login-admin",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
                types: [
                    types.LOGIN_REQUEST,
                    types.LOGIN_ADMIN_SUCCESS,
                    types.LOGIN_FAILURE,
                ],
            })
        );
        return;
    }
    dispatch(
        createAction({
            endpoint: "http://localhost:5000/accounts/login-user",
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
