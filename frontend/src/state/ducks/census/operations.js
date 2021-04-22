import { createAction } from "redux-api-middleware";
import { CENSUS_FAILURE, CENSUS_REQUEST, CENSUS_SUCCESS } from "./types";

const sendFormData = (data) => (dispatch) => {
    console.log("QUESTIONNAIRE DATA REQUEST");
    console.log(JSON.stringify({...data}))
    const dataToSend = {
        ...data,
        name: data.firstName,
        surname: data.lastName,
        gender: data.sex,
        matrialStatus: data.maritalStatus,
        region: data.address.voivodeship,
        district: data.address.district,
        community: data.address.community,
        city: data.address.town,
        street: data.address.street,
        registeredAddress: "placeholder",
        spouse: `${data.spouse.id} ${data.spouse.name} ${data.spouse.surname}`,
        kids: data.kids.length,
        householdMembers: 0,
        isDisabled: data.disabled
    }
    dispatch(
        createAction({
            endpoint: "http://localhost:5000/citizens/add",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...dataToSend}),
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
