import { Button, ButtonGroup, Container, Divider, Grid, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import EditIcon from '@material-ui/icons/Edit';
import { resetForm } from '../../state/ducks/census/actions';
import operations from "../../state/ducks/census/operations";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
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

const FormSummary = (props) => {
    const classes = useStyles();

    const restartForm = () => {
        props.resetForm();
        props.editStep(1);
    };

    const endForm = () => {
        props.nextStep();
        props.sendFormData(props.formData);
    }

    const getField = (fieldName, data) => (
        <Grid item style={{ display: "flex" }}>
            <Typography align="left" variant={"button"} style={{ marginRight: '6px' }}>
                {fieldName}:
            </Typography>
            <Typography variant={'body1'} style={{ marginTop: '-1px' }}>
                {data}
            </Typography>
        </Grid>
    )

    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <Typography align="left" variant={"h6"} paragraph>
                    Podsumowanie
                </Typography>
                <div align="left">
                    <Typography variant={"button"} style={{ fontSize: "16px" }}>
                        Dane osobowe
                    </Typography>
                    <IconButton color="primary" aria-label="edit" size="small" style={{ marginLeft: "8px", marginBottom: "4px" }} onClick={() => props.editStep(1)}>
                        <EditIcon style={{ fontSize: "22px" }} />
                    </IconButton>
                    <Divider style={{ marginTop: '-6px', marginBottom: '8px' }} />
                </div>

                {getField("Imię", props.formData.firstName)}
                {getField("Nazwisko", props.formData.lastName)}
                {getField("PESEL", props.formData.id)}
                {getField("Płeć", props.formData.sex === "male" ? "Mężczyzna" : "Kobieta")}
                {getField("Data urodzenia", props.formData.dateOfBirth)}
                {getField("Wykształcenie", props.formData.education === "primary"
                    ? "podstawowe"
                    : (props.formData.maritalStatus === "secondary") ? "średnie"
                        : "wyższe")}
                {getField("Stan cywilny ", props.formData.maritalStatus === "single"
                    ? "kawaler/panna"
                    : (props.formData.maritalStatus === "married") ? "żonaty/zamężna"
                        : (props.formData.maritalStatus === "divorced") ? "rozwiedziony/rozwiedziona"
                            : "wdowiec/wdowa")}

                <p />
                <div align="left">
                    <Typography variant={"button"} style={{ fontSize: "16px" }}>
                        Relacje rodzinne
                    </Typography>
                    <IconButton color="primary" aria-label="edit" size="small" style={{ marginLeft: "8px", marginBottom: "4px" }} onClick={() => props.editStep(2)}>
                        <EditIcon style={{ fontSize: "22px" }} />
                    </IconButton>
                    <Divider style={{ marginTop: '-6px', marginBottom: '8px' }} />
                </div>
                {props.formData.spouse ?
                    (
                        <>
                            <Typography variant="button" align="left" style={{ fontSize: "15px" }}>Małżonek</Typography>
                            <div>
                                <Typography variant={'body1'} align='left'>{props.formData.spouse.name} {props.formData.spouse.surname}</Typography>
                                <div align="left" style={{ fontSize: '12px', marginTop: "-6px", marginLeft: '4px' }}>
                                    <Typography variant='caption'>
                                        PESEL: {props.formData.spouse.id}
                                    </Typography>
                                </div>
                            </div>
                        </>
                    ) : <></>
                }
                {props.formData.kids.length !== 0 ?
                    (
                        <>
                            <Typography variant="button" align="left" style={{ fontSize: "15px" }}>Dzieci</Typography>
                            {props.formData.kids.map(k => (
                                <div >
                                    <Typography variant={'body1'} align='left'>{k.name} {k.surname}</Typography>
                                    <div align="left" style={{ fontSize: '12px', marginTop: "-6px", marginLeft: '4px' }}>
                                        <Typography variant='caption'>
                                            PESEL: {k.id}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : <></>
                }


                <p />
                <Grid container spacing={2}>
                    <Grid item xs={6} container>
                        <div align="left">
                            <Typography variant={"button"} style={{ fontSize: "16px" }}>
                                Adres zamieszkania
                            </Typography>
                            <IconButton color="primary" aria-label="edit" size="small" style={{ marginLeft: "8px", marginBottom: "4px" }} onClick={() => props.editStep(3)}>
                                <EditIcon style={{ fontSize: "22px" }} />
                            </IconButton>
                            <Divider style={{ marginTop: '-6px', marginBottom: '8px' }} />
                        </div>
                        {getField("Województwo", props.formData.address.voivodeship)}
                        {getField("Miejscowość", props.formData.address.town)}
                        {getField("Ulica", props.formData.address.street)}
                        {getField("Numer domu/mieszkania", props.formData.address.number)}
                    </Grid>
                    <Grid item xs={6} container>
                        <div align="left">
                            <Typography variant={"button"} style={{ fontSize: "16px" }}>
                                Adres zameldowania
                            </Typography>
                            <IconButton color="primary" aria-label="edit" size="small" style={{ marginLeft: "8px", marginBottom: "4px" }} onClick={() => props.editStep(4)}>
                                <EditIcon style={{ fontSize: "22px" }} />
                            </IconButton>
                            <Divider style={{ marginTop: '-6px', marginBottom: '8px' }} />
                        </div>
                        {getField("Województwo", props.formData.registeredAddress.voivodeship)}
                        {getField("Miejscowość", props.formData.registeredAddress.town)}
                        {getField("Ulica", props.formData.registeredAddress.street)}
                        {getField("Numer domu/mieszkania", props.formData.registeredAddress.number)}
                    </Grid>
                </Grid>

                <p />
                <div align="left">
                    <Typography variant={"button"} style={{ fontSize: "16px", marginTop: "26px" }}>
                        Zawód i status zatrudnienia
                    </Typography>
                    <IconButton color="primary" aria-label="edit" size="small" style={{ marginLeft: "8px", marginBottom: "4px" }} onClick={() => props.editStep(5)}>
                        <EditIcon style={{ fontSize: "22px" }} />
                    </IconButton>
                    <Divider style={{ marginTop: '-6px', marginBottom: '8px' }} />
                </div>

                {getField("Miejsce pracy", props.formData.workplace)}
                {getField("Wykonywany zawód", props.formData.worktype)}
                {getField("Rodzaj umowy", props.formData.typeOfEmploymentContract === "employment"
                    ? "o pracę"
                    : (props.formData.typeOfEmploymentContract === "specific") ? "umowa o dzieło"
                        : (props.formData.typeOfEmploymentContract === "mandate") ? "umowa zlecenie"
                            : "b2b")}
                {getField("Dochód z tytułu pracy", props.formData.earnings)}
                {getField("Niepełnosprawność", props.formData.disabled ? "Tak" : "Nie")}
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
                        className={classes.submit}
                        onClick={() => restartForm()}
                    >
                        Resetuj
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                        onClick={() => endForm()}
                        endIcon={<ArrowForwardIosSharpIcon />}
                    >
                        Prześlij
                </Button>
                </Grid>
            </Paper>
            <pre>
                {JSON.stringify(props.formData, null, 2)}
            </pre>
        </Container>

    )
}

const mapStateToProps = state => ({
    formData: state.formData,
});

const mapDispatchToProps = dispatch => {
    return {
        resetForm: () => dispatch(resetForm()),
        sendFormData: (data) => operations.sendFormData(data)(dispatch),
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(FormSummary);
