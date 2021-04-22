import React from "react";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    Checkbox,
    MenuItem,
    Paper,
    Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import { updateForm } from "../../../state/ducks/census/actions";
import operations from "../../../state/ducks/census/operations";


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
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

function FinalStep(props) {
    const classes = useStyles();

    const emptyValues = {
        workplace: "",
        worktype: "",
        typeOfEmploymentContract: "trial",
        earnings: 0,
        disabled: false,
    };

    const initialValues = props.formData;


    const validationSchema = Yup.object({
        workplace: Yup.string().required("Pole wymagane"),
        worktype: Yup.string().required("Pole wymagane"),
        typeOfEmploymentContract: Yup.string().required("Pole wymagane"),
        earnings: Yup.number().min(0),
        disabled: Yup.boolean(),
    });

    const resetForm = (values) => {
        values = emptyValues
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(data, { resetForm }) => {
                        props.updateForm(data);
                        console.log(data);
                        props.nextStep();
                        props.sendFormData(data);
                        resetForm();
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        validateForm,
                        setValues
                    }) => (
                        <Form className={classes.form} autoComplete="off">
                            <Typography align="left" variant={"h6"} paragraph>
                                Zawód i status zatrudnienia
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            name="workplace"
                                            type="input"
                                            variant="standard"
                                            label="Miejsce pracy"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                touched.workplace
                                                    ? errors.workplace
                                                    : ""
                                            }
                                            error={
                                                touched.workplace &&
                                                Boolean(errors.workplace)
                                            }
                                            as={TextField}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            name="worktype"
                                            type="input"
                                            variant="standard"
                                            label="Wykonywany zawód"
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                touched.worktype
                                                    ? errors.worktype
                                                    : ""
                                            }
                                            error={
                                                touched.worktype &&
                                                Boolean(errors.worktype)
                                            }
                                            as={TextField}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            name={`typeOfEmploymentContract`}
                                            type="select"
                                            variant="standard"
                                            margin="normal"
                                            label="Rodzaj umowy"
                                            as={TextField}
                                            fullWidth
                                            helperText={
                                                touched.typeOfEmploymentContract
                                                    ? errors.typeOfEmploymentContract
                                                    : ""
                                            }
                                            error={
                                                touched.typeOfEmploymentContract &&
                                                Boolean(
                                                    errors.typeOfEmploymentContract
                                                )
                                            }
                                            select
                                        >
                                            <MenuItem value="employment">
                                                umowa o pracę
                                            </MenuItem>
                                            <MenuItem value="specific">
                                                umowa o dzieło
                                            </MenuItem>
                                            <MenuItem value="mandate">
                                                umowa zlecenie
                                            </MenuItem>
                                            <MenuItem value="b2b">
                                                b2b
                                        </MenuItem>
                                        </Field>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <Field
                                            name="earnings"
                                            type="number"
                                            variant="standard"
                                            label="Dochód z tytułu pracy"
                                            margin="normal"
                                            as={TextField}
                                            InputProps={{ inputProps: { min: 0 } }}
                                            helperText={
                                                touched.earnings
                                                    ? errors.earnings
                                                    : ""
                                            }
                                            error={
                                                touched.earnings &&
                                                Boolean(errors.earnings)
                                            }
                                            fullWidth
                                            style={{ marginBottom: '-2px' }}
                                        />
                                        <Typography variant='caption' style={{ fontSize: '12px', marginTop: "-40px" }} color='textSecondary'>
                                            brutto, zaokrąglone do pełnych złotych
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <div style={{ display: "flex" }}>
                                    <Field
                                        name="disabled"
                                        type="checkbox"
                                        variant="standard"
                                        label="Niepełnosprawność "
                                        margin="normal"
                                        helperText={
                                            touched.disabled ? errors.disabled : ""
                                        }
                                        error={
                                            touched.disabled &&
                                            Boolean(errors.disabled)
                                        }
                                        as={Checkbox}
                                    />
                                    <Typography style={{ marginTop: "9px" }}>
                                        Niepełnosprawność
                                    </Typography>
                                </div>

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
        updateForm: (data) => dispatch(updateForm(data)),
        sendFormData: (data) => operations.sendFormData(data)(dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalStep);