import { createAction } from "redux-api-middleware";
import { FETCH_SUMMARY } from "./types";

const fetchMock = [
    {
        wojewodztwo: "Warmińsko-Mazurskie",
        podsumowanie: {
            liczbaMieszkancow: "1000000",
        },
    },
    {
        wojewodztwo: "Pomorskie",
        podsumowanie: {
            liczbaMieszkancow: "1001230",
        },
    },
    {
        wojewodztwo: "Łodzkie",
        podsumowanie: {
            liczbaMieszkancow: "10012324",
        },
    },
];
const fetchSummary = () => (dispatch) => {
    console.log("fetching summary");

    dispatch({ type: FETCH_SUMMARY, payload: fetchMock });
    // dispatch(
    //     createAction({
    //         endpoint: "http://localhost:5000/summary",
    //         method: "GET",
    //         headers: { "Content-Type": "application/json" },
    //         types: [
    //             types.SUMMARY_REQUEST,
    //             types.FETCH_SUMMARY,
    //             types.SUMMARY_FAILURE,
    //         ],
    //     })
    // );
};

const operations = {
    fetchSummary,
};

export default operations;
