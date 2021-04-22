import { USERS_FAILURE, USERS_REQUEST, GET_USERS_SUCCESS,  ADD_USERS, DELETE_USERS, PATCH_USERS  } from "./types.js";

const initialState = {
    users:[]
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_SUCCESS: {
            console.log('Halko');
            return {
                users: [...action.payload],
                
            }
        }
        case DELETE_USERS: {
            console.log(action);
            const arr=state.users.filter(elem => elem._id !== action.payload.id)
            console.log(arr);
            return {
                users: [...arr],
                
            }
        }
        case PATCH_USERS: {
            state.users.filter(elem => elem._id === action.payload._id)
            return {
                users: [...state.users,action.payload],
                
            }
        }
       

        

        default:
            return state
    }
}

export default usersReducer;