import { createAction } from "redux-api-middleware";
import { CENSUS_FAILURE, CENSUS_REQUEST, CENSUS_SUCCESS } from "./types";

const sendFormData = (data) => (dispatch) => {
    console.log("QUESTIONNAIRE DATA REQUEST");
    dispatch(
        createAction({
            endpoint: "http://localhost:5000/citizens/add",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...data}),
            types: [
                CENSUS_REQUEST,
                CENSUS_SUCCESS,
                CENSUS_FAILURE,
            ],
        })
    );
};

const operations = {
    sendFormData,
};

export default operations;
