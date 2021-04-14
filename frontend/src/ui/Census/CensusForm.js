import React from "react";
import { Formik, Field, Form, getIn } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
    Checkbox,
    Divider,
    FormControlLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Typography,
} from "@material-ui/core";
import * as Yup from "yup";
import { connect } from "react-redux";
import operations from "../../state/ducks/census/operations";

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
        width: "300px",
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

function CensusForm(props) {
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
            number: "",
        },
        registeredAddress: {
            voivodeship: "",
            town: "",
            street: "",
            number: "",
        },
        workplace: "",
        worktype: "",
        typeOfEmploymentContract: "trial",
        earnings: 0,
        nationality: "",
        disabled: false,
    };

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
        education: Yup.string().required("Pole wymagane"),
        maritalStatus: Yup.string().required("Pole wymagane"),
        spouse: Yup.string()
            .matches(/^\d+$/, "Niepoprawny numer PESEL")
            .length(11, "Niepoprawna długość"),
        kids: Yup.number().min(0),
        address: Yup.object({
            voivodeship: Yup.string().required("Pole wymagane"),
            town: Yup.string().required("Pole wymagane"),
            street: Yup.string().required("Pole wymagane"),
            number: Yup.string().required("Pole wymagane"),
        }),
        registeredAddress: Yup.object({
            voivodeship: Yup.string().required("Pole wymagane"),
            town: Yup.string().required("Pole wymagane"),
            street: Yup.string().required("Pole wymagane"),
            number: Yup.string().required("Pole wymagane"),
        }),
        workplace: Yup.string().required("Pole wymagane"),
        worktype: Yup.string().required("Pole wymagane"),
        typeOfEmploymentContract: Yup.string().required("Pole wymagane"),
        earnings: Yup.number().min(0),
        nationality: Yup.string().required("Pole wymagane"),
        disabled: Yup.boolean(),
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
                        props.sendFormData(data);
                        console.log(data);
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
                        resetForm
                    }) => (
                        <Form className={classes.form} autoComplete="off">
                            <Typography align="left" variant={"h4"} paragraph>
                                Uzupełnij dane
                            </Typography>
                            {/* imie */}
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
                            {/* Nazwisko */}
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

                            {/* pesel */}
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

                            {/* płeć */}
                            <Field
                                as={RadioGroup}
                                name="sex"
                                helperText={touched.sex ? errors.sex : ""}
                                error={touched.sex && Boolean(errors.sex)}
                            >
                                <Grid container style={{ margin: "10px 12px" }}>
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

                            <Grid container spacing={2}>
                                {/* data urodzenia  */}
                                <Grid item xs={12} sm={4}>
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

                                {/* stan cywilny */}
                                <Grid item xs={12} sm={4}>
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

                                {/* wykształcenie */}
                                <Grid item xs={12} sm={4}>
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

                            <Grid container spacing={2}>
                                {/* dane małżonka */}
                                <Grid item xs={12} sm={9}>
                                    <Field
                                        name="spouse"
                                        type="input"
                                        variant="standard"
                                        label="Dane małżonka (PESEL)"
                                        margin="normal"
                                        fullWidth
                                        disabled={
                                            values.maritalStatus !== "married"
                                        }
                                        helperText={
                                            touched.spouse ? errors.spouse : ""
                                        }
                                        error={
                                            touched.spouse &&
                                            Boolean(errors.spouse)
                                        }
                                        as={TextField}
                                    />
                                </Grid>

                                {/* ilosc dzieci */}
                                <Grid item xs={12} md={3}>
                                    <Field
                                        name="kids"
                                        type="number"
                                        variant="standard"
                                        label="Ilość dzieci"
                                        margin="normal"
                                        fullWidth
                                        InputProps={{ inputProps: { min: 0 } }}
                                        helperText={
                                            touched.kids ? errors.kids : ""
                                        }
                                        error={
                                            touched.kids && Boolean(errors.kids)
                                        }
                                        as={TextField}
                                    />
                                </Grid>
                            </Grid>

                            <Divider className={classes.divider} />
                            {/* adres zamieszkania */}
                            <Typography
                                align="left"
                                variant="subtitle2"
                                className={classes.subtitle}
                            >
                                Adres zamieszkania
                            </Typography>
                            <Grid container spacing={2}>
                                {/* województwo */}
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
                                {/* miejscowość */}
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
                                {/* ulica */}
                                <Grid item xs={12} sm={8}>
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
                                {/* numer domu/mieszkania */}
                                <Grid item xs={12} sm={4}>
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
                            <Divider className={classes.divider} />

                            {/* adres zameldowania */}
                            <Typography
                                align="left"
                                variant="subtitle2"
                                className={classes.subtitle}
                            >
                                Adres zameldowania
                            </Typography>
                            <Grid container spacing={2}>
                                {/* województwo */}
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
                                {/* miejscowość */}
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
                                {/* ulica */}
                                <Grid item xs={12} sm={8}>
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
                                {/* numer domu/mieszkania */}
                                <Grid item xs={12} sm={4}>
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
                            <Divider className={classes.divider} />

                            <Grid container spacing={2}>
                                {/* miejsce pracy */}
                                <Grid item xs={12} sm={6}>
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

                                {/* wykonywany zawód */}
                                <Grid item xs={12} sm={6}>
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
                                {/* rodzaj umowy */}
                                <Grid item xs={6} md={3}>
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
                                        <MenuItem value="trial">
                                            okres próbny
                                        </MenuItem>
                                        <MenuItem value="unspecified">
                                            czas nieokreślony
                                        </MenuItem>
                                        <MenuItem value="specified">
                                            czas określony
                                        </MenuItem>
                                    </Field>
                                </Grid>

                                {/* dochód  */}
                                <Grid item xs={6} md={3}>
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
                                    />
                                </Grid>

                                {/* obywatelstwo */}
                                <Grid item xs={12} md={6}>
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
                            </Grid>

                            {/* niepełnosprawnosć */}
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
                                    onClick={() => resetForm()}
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
                                >
                                    Prześlij
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Container>
    );
}

export default connect(null, { sendFormData: operations.sendFormData })(CensusForm);