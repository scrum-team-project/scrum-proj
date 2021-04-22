import React from "react";
import { Formik, Field, Form, getIn } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    Paper,
    Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
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
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

function ThirdStep(props) {
    const classes = useStyles();

    const emptyValues = {
        address: {
            voivodeship: "",
            town: "",
            street: "",
            number: "",
        },
    };

    const initialValues = props.formData;

    const validationSchema = Yup.object({
        address: Yup.object({
            voivodeship: Yup.string().required("Pole wymagane"),
            town: Yup.string().required("Pole wymagane"),
            street: Yup.string().required("Pole wymagane"),
            number: Yup.string().required("Pole wymagane"),
        }),
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
                        props.nextStep();
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
                                Adres zamieszkania
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={6}>
                                            <Field
                                                name="address.voivodeship"
                                                type="input"
                                                variant="standard"
                                                label="Województwo"
                                                margin="normal"
                                                fullWidth
                                                helperText={
                                                    getIn(
                                                        touched,
                                                        "address.voivodeship"
                                                    ) &&
                                                    getIn(errors, "address.voivodeship")
                                                }
                                                error={Boolean(
                                                    getIn(
                                                        touched,
                                                        "address.voivodeship"
                                                    ) &&
                                                    getIn(
                                                        errors,
                                                        "address.voivodeship"
                                                    )
                                                )}
                                                as={TextField}
                                            />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="address.town"
                                            type="input"
                                            variant="standard"
                                            label="Miejscowość"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(touched, "address.town") &&
                                                getIn(errors, "address.town")
                                            }
                                            error={Boolean(
                                                getIn(touched, "address.town") &&
                                                getIn(errors, "address.town")
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={7}>
                                        <Field
                                            name="address.street"
                                            type="input"
                                            variant="standard"
                                            label="Ulica"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(touched, "address.street") &&
                                                getIn(errors, "address.street")
                                            }
                                            error={Boolean(
                                                getIn(touched, "address.street") &&
                                                getIn(errors, "address.street")
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={5}>
                                        <Field
                                            name="address.number"
                                            type="input"
                                            variant="standard"
                                            label="Numer domu/mieszkania"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(touched, "address.number") &&
                                                getIn(errors, "address.number")
                                            }
                                            error={Boolean(
                                                getIn(touched, "address.number") &&
                                                getIn(errors, "address.number")
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container justify="space-between">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={() => props.prevStep()}
                                        startIcon={<ArrowBackIosSharpIcon />}
                                    >
                                        Wstecz
                                </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);