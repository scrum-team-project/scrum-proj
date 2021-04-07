import React from "react";
import { Formik, Field } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Checkbox, Divider, FormControlLabel, MenuItem, Paper, Radio, RadioGroup, Typography } from "@material-ui/core";
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
    },
    select: {
        margin: "8px 16px"
    },
    divider: {
        marginTop: '12px',
        marginBottom: '20px'
    },
    subtitle: {
        fontSize: '18px',
        margin: '12px 0px 0px 6px'
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
        education: "primary",
        maritalStatus: "single",
        spouse: "",
        kids: 0,
        address: {
            voivodeship: "",
            town: "",
            street: "",
            number: ""
        },
        // addres: "",
        registeredAddres: "",
        workplace: "",
        worktype: "",
        typeOfEmploymentContract: "trial",
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
                    {({ values, handleSubmit, isSubmitting }) => (
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Typography align="left" variant={'h4'} paragraph>Uzupełnij dane</Typography>
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

                            {/* pesel */}
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
                            <Field as={RadioGroup} name="sex">
                                <Grid container style={{ margin: '10px 12px' }}>
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
                                </Grid>

                            </Field>

                            <Grid container spacing={2}>
                                {/* data urodzenia  */}
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name='dateOfBirth'
                                        type='date'
                                        variant="outlined"
                                        label="Data urodzenia"
                                        margin="normal"
                                        as={TextField}
                                        fullWidth
                                    />
                                </Grid>

                                {/* stan cywilny */}
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name={`maritalStatus`}
                                        type="select"
                                        variant="outlined"
                                        margin="normal"
                                        label="Stan cywilny"
                                        as={TextField}
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value="single">Kawaler/panna</MenuItem>
                                        <MenuItem value="married">Żonaty/zamężna</MenuItem>
                                        <MenuItem value="divorced">Rozwiedziony/rozwiedziona</MenuItem>
                                    </Field>
                                </Grid>

                                {/* wykształcenie */}
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name={`education`}
                                        type="select"
                                        variant="outlined"
                                        margin="normal"
                                        label="Wykształcenie"
                                        as={TextField}
                                        select
                                        fullWidth
                                    >
                                        <MenuItem value="primary">Podstawowe</MenuItem>
                                        <MenuItem value="secondary">Średnie</MenuItem>
                                        <MenuItem value="higher">Wyższe</MenuItem>
                                    </Field>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>

                                {/* dane małżonka */}
                                <Grid item xs={12} sm={8}>
                                    <Field
                                        name='spouse'
                                        type='input'
                                        variant="outlined"
                                        label="Dane małżonka (PESEL)"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>

                                {/* ilosc dzieci */}
                                <Grid item xs={12} md={4}>
                                    <Field
                                        name='kids'
                                        type='number'
                                        variant="outlined"
                                        label="Ilość dzieci"
                                        margin="normal"
                                        as={TextField}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Divider className={classes.divider} />
                            <Typography align="left" variant='subtitle2' className={classes.subtitle}>Adres zamieszkania</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='address.voivodeship'
                                        type='input'
                                        variant="outlined"
                                        label="Województwo"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='address.town'
                                        type='input'
                                        variant="outlined"
                                        label="Miejscowość"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Field
                                        name='address.street'
                                        type='input'
                                        variant="outlined"
                                        label="Ulica"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name='address.number'
                                        type='input'
                                        variant="outlined"
                                        label="Numer domu/mieszkania"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />
                            <Typography align="left" variant='subtitle2' className={classes.subtitle}>Adres zameldowania</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='address.voivodeship'
                                        type='input'
                                        variant="outlined"
                                        label="Województwo"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='address.town'
                                        type='input'
                                        variant="outlined"
                                        label="Miejscowość"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={8}>
                                    <Field
                                        name='address.street'
                                        type='input'
                                        variant="outlined"
                                        label="Ulica"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        name='address.number'
                                        type='input'
                                        variant="outlined"
                                        label="Numer domu/mieszkania"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>
                            <Divider className={classes.divider} />

                            {/* adres zamieszkania */}
                            {/* <Grid item xs={12} sm={6}>
                                    <Field
                                        name='address.town'
                                        type='input'
                                        variant="outlined"
                                        label="Adres zamieszkania"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid> */}
                            {/* adres zameldowania */}
                            {/* <Grid item xs={12} sm={6}>
                                    <Field
                                        name='registeredAddres'
                                        type='input'
                                        variant="outlined"
                                        label="Adres zameldowania"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid> */}

                            {/* </Grid> */}

                            <Grid container spacing={2}>

                                {/* miejsce pracy */}
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='workplace'
                                        type='input'
                                        variant="outlined"
                                        label="Miejsce pracy"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>

                                {/* wykonywany zawód */}
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        name='worktype'
                                        type='input'
                                        variant="outlined"
                                        label="Wykonywany zawód"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} justify={'space-between'}>

                                {/* rodzaj umowy */}
                                <Grid item xs={6} md={3}>
                                    <Field
                                        name={`typeOfEmploymentContract`}
                                        type="select"
                                        variant="outlined"
                                        margin="normal"
                                        label="Rodzaj umowy"
                                        as={TextField}
                                        fullWidth
                                        select
                                    >
                                        <MenuItem value="trial">okres próbny</MenuItem>
                                        <MenuItem value="unspecified">czas nieokreślony</MenuItem>
                                        <MenuItem value="specified">czas określony</MenuItem>
                                    </Field>
                                </Grid>

                                {/* dochód  */}
                                <Grid item xs={6} md={3}>
                                    <Field
                                        name='earnings'
                                        type='number'
                                        variant="outlined"
                                        label="Dochód z tytułu pracy"
                                        margin="normal"
                                        as={TextField}
                                        fullWidth
                                    />
                                </Grid>

                                {/* obywatelstwo */}
                                <Grid item xs={12} md={6}>
                                    <Field
                                        name='nationality'
                                        type='input'
                                        variant="outlined"
                                        label="Kraj obywatelstwa"
                                        margin="normal"
                                        fullWidth
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>

                            {/* niepełnosprawnosć */}
                            <div style={{ display: 'flex' }}>
                                <Field
                                    name='disabled'
                                    type='checkbox'
                                    variant="outlined"
                                    label="Niepełnosprawność "
                                    margin="normal"
                                    as={Checkbox}
                                />
                                <Typography style={{ marginTop: '9px' }}>Niepełnosprawność</Typography>
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

        </Container >

    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, { login: operations.login })(LoginForm);