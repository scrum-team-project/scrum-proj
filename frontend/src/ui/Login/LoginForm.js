import React from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import operations from "../../state/ducks/user/operations";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    paddingLeft: '6px',
    fontSize: '14px',
    color: '#c00000',
  }
}));

function LoginForm(props) {
  const classes = useStyles();

  const initialValues = {
    login: "",
    password: "",
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box className={classes.paper}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={(data) => props.login(data.login, data.password)}
        >
          {({ values, handleSubmit, handleChange, resetForm }) => (
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}
            >
              <TextField
                value={values.username}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="login"
                label="Login"
                name="login"
                autoComplete="login"
                autoFocus
              />
              <TextField
                value={values.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Hasło"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Grid container>
                <Grid container>
                  <Grid item>
                    <div className={classes.error}>{props.user.message}</div>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => resetForm()}
                >
                  Zalouj się
            </Button>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { login: operations.login })(LoginForm);