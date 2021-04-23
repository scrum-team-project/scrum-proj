import { createAction } from "redux-api-middleware";
import { FETCH_SUMMARY, SUMMARY_REQUEST, SUMMARY_FAILURE } from "./types";
const mockSummary = [
    {
        region: "Mazowieckie",
        districts: [
            {
                district: "Warszawa",
                communities: [
                    {
                        community: "Warszawa",
                        cities: [
                            {
                                city: "Warszawa",
                                summaryCity: {
                                    population: 2,
                                    workingPopulation: 1,
                                    workingPercentage: 50,
                                },
                            },
                        ],
                        summaryCommunity: {
                            population: 2,
                            workingPopulation: 1,
                            workingPercentage: 50,
                        },
                    },
                ],
                summaryDistrict: {
                    population: 2,
                    workingPopulation: 1,
                    workingPercentage: 50,
                },
            },
            {
                district: "Legionowo",
                communities: [
                    {
                        community: "Legionowo",
                        cities: [
                            {
                                city: "Legionowo",
                                summaryCity: {
                                    population: 1,
                                    workingPopulation: 0,
                                    workingPercentage: 0,
                                },
                            },
                        ],
                        summaryCommunity: {
                            population: 1,
                            workingPopulation: 0,
                            workingPercentage: 0,
                        },
                    },
                ],
                summaryDistrict: {
                    population: 1,
                    workingPopulation: 0,
                    workingPercentage: 0,
                },
            },
        ],
        summaryRegion: {
            population: 3,
            workingPopulation: 1,
            workingPercentage: 33.33,
        },
    },
    {
        region: "Pomorskie",
        districts: [
            {
                district: "Gdynia",
                communities: [
                    {
                        community: "Gdynia",
                        cities: [
                            {
                                city: "Gdynia",
                                summaryCity: {
                                    population: 1,
                                    workingPopulation: 1,
                                    workingPercentage: 100,
                                },
                            },
                        ],
                        summaryCommunity: {
                            population: 1,
                            workingPopulation: 1,
                            workingPercentage: 100,
                        },
                    },
                ],
                summaryDistrict: {
                    population: 1,
                    workingPopulation: 1,
                    workingPercentage: 100,
                },
            },
            {
                district: "Gdańsk",
                communities: [
                    {
                        community: "Gdańsk",
                        cities: [
                            {
                                city: "Gdańsk",
                                summaryCity: {
                                    population: 1,
                                    workingPopulation: 1,
                                    workingPercentage: 100,
                                },
                            },
                        ],
                        summaryCommunity: {
                            population: 1,
                            workingPopulation: 1,
                            workingPercentage: 100,
                        },
                    },
                ],
                summaryDistrict: {
                    population: 1,
                    workingPopulation: 1,
                    workingPercentage: 100,
                },
            },
        ],
        summaryRegion: {
            population: 2,
            workingPopulation: 2,
            workingPercentage: 100,
        },
    },
];

const fetchSummary = () => (dispatch) => {
    // console.log("fetching summary");
    // dispatch({ type: FETCH_SUMMARY, payload: mockSummary });
    dispatch(
        createAction({
            endpoint: "http://localhost:5000/citizens/summaryByRegion",
            method: "GET",
            headers: { "Content-Type": "application/json" },
            types: [SUMMARY_REQUEST, FETCH_SUMMARY, SUMMARY_FAILURE],
        })
    );
};

const operations = {
    fetchSummary,
};

export default operations;
