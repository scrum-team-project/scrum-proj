

import { USERS_FAILURE, USERS_REQUEST, GET_USERS_SUCCESS,  ADD_USERS, DELETE_USERS, PATCH_USERS  } from "./types.js";
import { createAction } from 'redux-api-middleware'

export const getUsers = () => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/citizens/all ',
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  types: [
    USERS_REQUEST, 
    GET_USERS_SUCCESS,
    USERS_FAILURE]

}));



export const addUsers = (values) => (dispatch) => dispatch(createAction({
  endpoint: 'http://localhost:5000/citizens/add',
  method: 'POST',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    USERS_REQUEST,
    ADD_USERS,
    USERS_FAILURE,
  ]

}));


export const delUsers = (id) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/citizens/${id}`,
  method: 'DELETE',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id
  }),
  types: [
    USERS_REQUEST,DELETE_USERS,
    USERS_FAILURE
  ]

}))

export const putUsers = (values) => (dispatch) => dispatch(createAction({
  endpoint: `http://localhost:5000/citizens/${values.id}`,
  method: 'PATCH',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...values
  }),
  types: [
    USERS_REQUEST,PATCH_USERS,
    USERS_FAILURE
  ]

}));
