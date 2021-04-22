import React from "react";
import { Formik, Field, Form, FieldArray, getIn } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    IconButton,
    MenuItem,
    Paper,
    Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClearIcon from '@material-ui/icons/Clear';
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
    iconButtonLabel: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

function SecondStep(props) {
    const classes = useStyles();

    const emptyValues = {
        maritalStatus: "single",
        spouse: {
            name: "",
            surname: "",
            id: ""
        },
        kids: [],
    };

    const initialValues = props.formData;

    const validationSchema = Yup.object({
        maritalStatus: Yup.string().required("Pole wymagane"),
        spouse: Yup.object({
            name: Yup.string().required("Pole wymagane"),
            surname: Yup.string().required("Pole wymagane"),
            id: Yup.string().required("Pole wymagane"),
        }),
        kids: Yup.array(),
    });

    const getChildrenSubform = (index, remove) => (
        <Grid container style={{marginBottom: "36px"}}>
            <AccountCircleIcon fontSize="large" style={{ color: 'LightSlateGrey', marginLeft: '8px' }} />
            <Field name={`kids.${index}.id`} type="text" placeholder={'PESEL'} as={TextField} style={{ marginLeft: '6px' }} />
            <Grid item xs={12} align="left">
                <IconButton color="primary" aria-label="edit" component="span" onClick={() => remove(index)} style={{ margin: '0px -4px 0px 4px'}} >
                    <ClearIcon fontSize='small' />
                </IconButton>
                <Field name={`kids.${index}.name`} type="text" placeholder={'Imię'} as={TextField} style={{ marginLeft: '4px' }} />
            </Grid>
            <Grid item xs={12} align="left">
                <Field name={`kids.${index}.surname`} type="text" placeholder={'Nazwisko'} as={TextField} style={{ marginLeft: '48px' }} />
            </Grid>
        </Grid>
    )


    return (
        <Container component="main" maxWidth="sm">
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
                                Relacje rodzinne
                            </Typography>
                            <Grid container>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} sm={8}>
                                        <Field
                                            name={`maritalStatus`}
                                            type="select"
                                            variant="standard"
                                            margin="normal"
                                            label="Stan cywilny"
                                            select
                                            fullWidth
                                            helperText={
                                                touched.maritalStatus
                                                    ? errors.maritalStatus
                                                    : ""
                                            }
                                            error={
                                                touched.maritalStatus &&
                                                Boolean(errors.maritalStatus)
                                            }
                                            as={TextField}
                                        >
                                            <MenuItem value="single">
                                                kawaler/panna
                                        </MenuItem>
                                            <MenuItem value="married">
                                                żonaty/zamężna
                                        </MenuItem>
                                            <MenuItem value="divorced">
                                                rozwiedziony/rozwiedziona
                                        </MenuItem>
                                            <MenuItem value="widowed">
                                                wdowiec/wdowa
                                        </MenuItem>
                                        </Field>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <Typography align="left" variant={"subtitle2"}
                                            style={{ marginTop: '-5px', marginBottom: "-16px" }}
                                            color={values.maritalStatus !== "married" ? "textSecondary" : "textPrimary"}>
                                            Dane małżonka
                                        </Typography>
                                        <Field
                                            name="spouse.id"
                                            type="input"
                                            variant="standard"
                                            label="PESEL"
                                            disabled={
                                                values.maritalStatus !== "married"
                                            }
                                            margin="normal"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "spouse.id"
                                                ) &&
                                                getIn(errors, "spouse.id")
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "spouse.id"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "spouse.id"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                        <Field
                                            name="spouse.name"
                                            type="input"
                                            variant="standard"
                                            label="Imię"
                                            disabled={
                                                values.maritalStatus !== "married"
                                            }
                                            margin="dense"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "spouse.name"
                                                ) &&
                                                getIn(errors, "spouse.name")
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "spouse.name"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "spouse.name"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                        <Field
                                            name="spouse.surname"
                                            type="input"
                                            variant="standard"
                                            label="Nazwisko"
                                            disabled={
                                                values.maritalStatus !== "married"
                                            }
                                            margin="dense"
                                            fullWidth
                                            helperText={
                                                getIn(
                                                    touched,
                                                    "spouse.surname"
                                                ) &&
                                                getIn(errors, "spouse.surname")
                                            }
                                            error={Boolean(
                                                getIn(
                                                    touched,
                                                    "spouse.surname"
                                                ) &&
                                                getIn(
                                                    errors,
                                                    "spouse.surname"
                                                )
                                            )}
                                            as={TextField}
                                        />
                                    </Grid>
                                </Grid>

                                <FieldArray name='kids'>
                                    {({ remove, push }) => (
                                        <Grid container justify='flex-start'>

                                            <Button aria-label="delete" color="primary" size="medium" justify="flex-start"
                                                onClick={() => push({ id: '' })} style={{ marginBottom: '12px' }}>
                                                <AddCircleIcon fontSize="large" />
                                                <Typography variant={'button'} style={{ marginLeft: '4px' }}>Dodaj dziecko</Typography>
                                            </Button>
                                            <Grid container direction="column" alignItems="flex-start">
                                                {values.kids.map((d, index) => (
                                                    getChildrenSubform(index, remove, push)
                                                ))}
                                            </Grid>

                                        </Grid>
                                    )}
                                </FieldArray>

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

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);