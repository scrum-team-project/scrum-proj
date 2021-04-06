import React from "react";
import { Formik, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Checkbox, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, Select, Typography } from "@material-ui/core";
import operations from "../../state/ducks/user/operations";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
        firstName: "",
        lastName: "",
        id: "",
        sex: "",
        dateOfBirth: new Date().toISOString().split("T")[0],
        maritalStatus: "single",
        education: "primary",
        addres: "",
        registeredAddres: "",
        workplace: "",
        worktype: "",
        typeOfEmploymentContract: "",
        earnings: 0,
        nationality: "",
        disabled: false
    }

    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        console.log(data)
                        props.login(data.login, data.password);
                        setSubmitting(false);
                        resetForm();
                    }
                    }
                >
                    {({ values, handleSubmit, handleChange, isSubmitting }) => (
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            {/* imie */}
                            <Field
                                name='firstName'
                                type='input'
                                variant="outlined"
                                label="Imię"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* Nazwisko */}
                            <Field
                                name='lastName'
                                type='input'
                                variant="outlined"
                                label="Nazwisko"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            <Field
                                name='id'
                                type='input'
                                variant="outlined"
                                label="PESEL"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* płeć */}
                            <div>
                                <Field as={RadioGroup} name="sex">
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio disabled={isSubmitting} />}
                                        label="Mężczyzna"
                                        disabled={isSubmitting}
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio disabled={isSubmitting} />}
                                        label="Kobieta"
                                        disabled={isSubmitting}
                                    />
                                </Field>
                            </div>

                            {/* data urodzenia  */}
                            <Field
                                name='dateOfBirth'
                                type='date'
                                variant="outlined"
                                label="Data urodzenia"
                                margin="normal"
                                as={TextField}
                            />

                            {/* stan cywilny */}
                            <Field
                                name={`maritalStatus`}
                                type="select"
                                variant="outlined"
                                margin="normal"
                                label="Stan cywilny"
                                as={TextField}
                                select
                            >
                                <MenuItem value="single">Kawaler/panna</MenuItem>
                                <MenuItem value="married">Żonaty/zamężna</MenuItem>
                                <MenuItem value="divorced">Rozwiedziony/rozwiedziona</MenuItem>
                            </Field>

                            {/* wykształcenie */}
                            <Field
                                name={`education`}
                                type="select"
                                variant="outlined"
                                margin="normal"
                                label="Wykształcenie"
                                as={TextField}
                                select
                            >
                                <MenuItem value="primary">Podstawowe</MenuItem>
                                <MenuItem value="secondary">Średnie</MenuItem>
                                <MenuItem value="higher">Wyższe</MenuItem>
                            </Field>

                            {/* adres zamieszkania */}
                            <Field
                                name='addres'
                                type='input'
                                variant="outlined"
                                label="Adres zamieszkania"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* adres zameldowania */}
                            <Field
                                name='registeredAddres'
                                type='input'
                                variant="outlined"
                                label="Adres zameldowania"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* miejsce pracy */}
                            <Field
                                name='workplace'
                                type='input'
                                variant="outlined"
                                label="Miejsce pracy"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* wykonywany zawód */}
                            <Field
                                name='worktype'
                                type='input'
                                variant="outlined"
                                label="Wykonywany zawód"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />

                            {/* dochód  */}
                            <Field
                                name='earnings'
                                type='number'
                                variant="outlined"
                                label="Dochód z tytułu pracy"
                                margin="normal"
                                as={TextField}
                            />

                            {/* obywatelstwo */}
                            <Field
                                name='nationality'
                                type='input'
                                variant="outlined"
                                label="Kraj posiadanego obywatelstwa"
                                margin="normal"
                                fullWidth
                                as={TextField}
                            />
                            <div style={{ display: 'flex' }}>
                                <Typography style={{ marginTop: '8px' }}>Niepełnosprawność</Typography>
                                <Field
                                    name='disabled'
                                    type='checkbox'
                                    variant="outlined"
                                    label="Niepełnosprawność "
                                    margin="normal"
                                    as={Checkbox}
                                />
                            </div>


                            <Grid container>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    className={classes.submit}
                                >
                                    Prześlij
                            </Button>
                            </Grid>
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                        </form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { login: operations.login })(LoginForm);