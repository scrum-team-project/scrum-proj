import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./ducks/user/reducers";

const rootReducer = combineReducers({ user: loginReducer });

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, createMiddleware()))
);


export default store;