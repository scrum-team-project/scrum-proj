import { Button, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Zoom from '@material-ui/core/Zoom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: "2px",
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

    select: {
        margin: "8px 16px",
    },


}));

const FormConfirmation = () => {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    React.useEffect(() => {
        setChecked(!checked);
    }, [])


    return (
        <Container component="main" maxWidth="sm">
            <Paper className={classes.paper}>
                <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
                    <CheckCircleIcon color="primary" fontSize="large" />
                </Zoom>
                <Typography align="left" variant={"h6"}>
                    Formularz został poprawnie wypełniony
                </Typography>
                <Typography>
                    Dziękujemy za udział.
                </Typography>
                <Grid container justify="flex-end" style={{ marginBottom: "-30px", marginRight: "-30px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.submit}
                    >
                        Zakończ
                    </Button>
                </Grid>
            </Paper>
        </Container>
    )
};

export default FormConfirmation;
