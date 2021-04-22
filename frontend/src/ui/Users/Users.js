import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers, delUsers, putUsers ,addUsers } from "../../state/ducks/users/actions";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const useStyles = makeStyles({
  table: {
    minWidth: 100,
  },
});
function createData(index,name, surname, pesel,_id) {
  return {index, name, surname, pesel,_id };
}
const Users = ({ users, getUsers, delUsers, putUsers,addUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const classes = useStyles();

  console.log(users);
  let rows = users && users.map((user,index) => 
    createData(index+1+".",user.name,user.surname,user.spouse,user._id),
    );
    return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Użytkownicy</TableCell>
                <TableCell align="left">Imię</TableCell>
                <TableCell align="left">Nazwisko</TableCell>
                <TableCell align="left">Pesel</TableCell>
                <TableCell align="left">Usuń</TableCell>
            
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.index}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.surname}</TableCell>
                  <TableCell align="left">{row.pesel}</TableCell>
                  <TableCell align="left"><button onClick={() => delUsers(row._id)}>Usuń</button></TableCell>
                 
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
};



const mapStatetoProps = (state) => ({
  users: state.users.users,
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => getUsers()(dispatch),
  delUsers: (id) => delUsers(id)(dispatch),
  putUsers: (user) => putUsers(user)(dispatch),
  addUsers: (user) => addUsers(user)(dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Users);
