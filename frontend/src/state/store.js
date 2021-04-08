import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createMiddleware } from "redux-api-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import loginReducer from "./ducks/user/reducers";
import summaryReducer from "./ducks/summary/reducers";

const rootReducer = combineReducers({
    user: loginReducer,
    summary: summaryReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, createMiddleware()))
);


export default store;
