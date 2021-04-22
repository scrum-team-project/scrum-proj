
import React, { useEffect } from "react";
import { connect } from "react-redux";
//import operations from "../../state/ducks/users/operations";
import { getUsers,delUsers,putUsers } from "../../state/ducks/users/actions";
const Users = ({ users, getUsers,delUsers,putUsers }) => {
    useEffect(() => {
        getUsers();
        
    }, [getUsers]);
    console.log(users);
    let view= users && users.map( (user) => (
    <div key={user._id}>
    {`${user.name} ${user.surname} ${user.pesel}`}
    <button onClick={() => delUsers(user._id)}>Delete</button>
    <button onClick={() => putUsers(user)}>Edit</button> 
    
    </div> 
    ) )
    return (
        <div>{view}</div>
    );
};

const mapStatetoProps = (state) => ({
    users: state.users.users,
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => getUsers()(dispatch),
    delUsers: (id) => delUsers(id)(dispatch),
    putUsers: (user) => putUsers(user)(dispatch)
});

export default connect(mapStatetoProps, mapDispatchToProps)(Users);
