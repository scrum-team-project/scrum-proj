import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    FormControlLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import { updateForm } from "../../../state/ducks/census/actions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: "115px",
        height: "40px"
    },
    error: {
        paddingLeft: "6px",
        fontSize: "14px",
        color: "#c00000",
    },
    select: {
        margin: "8px 16px",
    },
    divider: {
        marginTop: "12px",
        marginBottom: "20px",
    },
    subtitle: {
        fontSize: "18px",
        margin: "12px 0px 0px 6px",
    },
}));

function FirstStep(props) {
    const classes = useStyles();

    const emptyValues = {
        firstName: "",
        lastName: "",
        id: "",
        sex: "",
        dateOfBirth: new Date().toISOString().split("T")[0],
        nationality: "",
        education: "",
    };

    const initialValues = props.formData;

    const validationSchema = Yup.object({
        firstName: Yup.string().required("Pole wymagane"),
        lastName: Yup.string().required("Pole wymagane"),
        id: Yup.string()
            .required("Pole wymagane")
            .matches(/^\d+$/, "Niepoprawny numer PESEL")
            .length(11, "Niepoprawna długość"),
        sex: Yup.string().required("Pole wymagane"),
        dateOfBirth: Yup.date()
            .required("Pole wymagane")
            .max(new Date(), "Niepoprawna data urodzenia"),
        nationality: Yup.string().required("Pole wymagane"),
        education: Yup.string().required("Pole wymagane"),
    });


    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        props.updateForm(data);
                        console.log(data);
                        props.nextStep()
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        validateForm,
                        setValues
                    }) => (
                        <Form className={classes.form} autoComplete="off">

                            <Typography align="left" variant={"h6"} paragraph>
                                Proszę uzupełnić poniższe dane
                            </Typography>

                            <Field
                                name="firstName"
                                type="input"
                                variant="standard"
                                label="Imię"
                                margin="normal"
                                fullWidth
                                helperText={
                                    touched.firstName ? errors.firstName : ""
                                }
                                error={
                                    touched.firstName &&
                                    Boolean(errors.firstName)
                                }
                                as={TextField}
                            />
                            <Field
                                name="lastName"
                                type="input"
                                variant="standard"
                                label="Nazwisko"
                                margin="normal"
                                fullWidth
                                helperText={
                                    touched.lastName ? errors.lastName : ""
                                }
                                error={
                                    touched.lastName && Boolean(errors.lastName)
                                }
                                as={TextField}
                            />

                            <Field
                                name="id"
                                type="input"
                                variant="standard"
                                label="PESEL"
                                margin="normal"
                                fullWidth
                                helperText={touched.id ? errors.id : ""}
                                error={touched.id && Boolean(errors.id)}
                                as={TextField}
                            />

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={7} md={4} style={{ marginRight: '-15px' }}>
                                    <Field
                                        as={RadioGroup}
                                        name="sex"
                                        helperText={touched.sex ? errors.sex : ""}
                                        error={touched.sex && Boolean(errors.sex)}
                                    >
                                        <Grid container style={{ padding: "20px 15px" }}>
                                            <FormControlLabel
                                                value="male"
                                                control={
                                                    <Radio disabled={isSubmitting} />
                                                }
                                                label="mężczyzna"
                                                disabled={isSubmitting}
                                            />
                                            <FormControlLabel
                                                value="female"
                                                control={
                                                    <Radio disabled={isSubmitting} />
                                                }
                                                label="kobieta"
                                                disabled={isSubmitting}
                                            />
                                        </Grid>
                                    </Field>
                                </Grid>

                                <Grid item xs={6} sm={5} md={3}>
                                    <Field
                                        name="nationality"
                                        type="input"
                                        variant="standard"
                                        label="Kraj obywatelstwa"
                                        margin="normal"
                                        fullWidth
                                        helperText={
                                            touched.nationality
                                                ? errors.nationality
                                                : ""
                                        }
                                        error={
                                            touched.nationality &&
                                            Boolean(errors.nationality)
                                        }
                                        as={TextField}
                                    />
                                </Grid>

                                <Grid item xs={6} md={2}>
                                    <Field
                                        name="dateOfBirth"
                                        type="date"
                                        variant="standard"
                                        label="Data urodzenia"
                                        margin="normal"
                                        fullWidth
                                        helperText={
                                            touched.dateOfBirth
                                                ? errors.dateOfBirth
                                                : ""
                                        }
                                        error={
                                            touched.dateOfBirth &&
                                            Boolean(errors.dateOfBirth)
                                        }
                                        as={TextField}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={3}>
                                    <Field
                                        name={`education`}
                                        type="select"
                                        variant="standard"
                                        margin="normal"
                                        label="Wykształcenie"
                                        select
                                        fullWidth
                                        helperText={
                                            touched.education
                                                ? errors.education
                                                : ""
                                        }
                                        error={
                                            touched.education &&
                                            Boolean(errors.education)
                                        }
                                        as={TextField}
                                    >
                                        <MenuItem value="primary">
                                            podstawowe
                                        </MenuItem>
                                        <MenuItem value="secondary">
                                            średnie
                                        </MenuItem>
                                        <MenuItem value="higher">
                                            wyższe
                                        </MenuItem>
                                    </Field>
                                </Grid>
                            </Grid>

                            <Grid container justify="space-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setValues(emptyValues)}
                                    className={classes.submit}
                                >
                                    Resetuj
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    onClick={() => validateForm()}
                                    className={classes.submit}
                                    endIcon={<ArrowForwardIosSharpIcon />}
                                >
                                    Dalej
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}

const mapStateToProps = state => ({
    formData: state.formData
});


const mapDispatchToProps = dispatch => {
    return {
        updateForm: (data) => dispatch(updateForm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);