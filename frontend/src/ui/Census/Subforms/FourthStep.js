import React, { useEffect, useState } from "react";
import { Formik, Field, Form, getIn } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    Checkbox,
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

function FourthStep(props) {
    const classes = useStyles();

    const [copyAddress, setCopyAddress] = useState(false);

    useEffect(() => console.log(initialValues), [copyAddress])


    const emptyValues = {
        registeredAddress: {
            voivodeship: "",
            town: "",
            street: "",
            number: "",
        },
    };

    const initialValues = copyAddress
        ? { registeredAddress: { ...props.formData.address } }
        : { registeredAddress: { ...props.formData.registeredAddress } };

    const validationSchema = Yup.object({
        registeredAddress: Yup.object({
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
                    validationSchema={validationSchema}
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
                                Adres zameldowania
                            </Typography>
                            <Grid container spacing={2}>
                                <div style={{ display: "flex" }}>
                                    <Checkbox align="left"
                                        checked={copyAddress}
                                        onChange={() => {
                                            setCopyAddress(!copyAddress);
                                            setValues(initialValues)
                                        }}
                                    />
                                    <Typography align="left" variant={"body2"} style={{ marginTop: "11px" }}>
                                        W miejscu zamieszkania
                                    </Typography>
                                </div>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="registeredAddress.voivodeship"
                                            type="input"
                                            variant="standard"
                                            label="Województwo"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "registeredAddress.voivodeship"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.voivodeship"
                                                )
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "registeredAddress.voivodeship"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.voivodeship"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field
                                            name="registeredAddress.town"
                                            type="input"
                                            variant="standard"
                                            label="Miejscowość"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "registeredAddress.town"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.town"
                                                )
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "registeredAddress.town"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.town"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={7}>
                                        <Field
                                            name="registeredAddress.street"
                                            type="input"
                                            variant="standard"
                                            label="Ulica"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "registeredAddress.street"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.street"
                                                )
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "registeredAddress.street"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.street"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Field
                                            name="registeredAddress.number"
                                            type="input"
                                            variant="standard"
                                            label="Numer domu/mieszkania"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "registeredAddress.number"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.number"
                                                )
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "registeredAddress.number"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "registeredAddress.number"
                                                )
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
                                        onClick={() => {
                                            setCopyAddress(false)
                                            setValues(emptyValues)
                                        }}
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
        </Container >
    );
};


const mapStateToProps = state => ({
    formData: state.formData
});


const mapDispatchToProps = dispatch => {
    return {
        updateForm: (data) => dispatch(updateForm(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FourthStep);