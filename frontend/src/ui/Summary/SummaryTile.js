import {
    Card,
    CardContent,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";

import React from "react";
const useStyles = makeStyles((theme) => ({
    card: {
        padding: "5%",
        height: "90%",
    },
    cardContent: {
        display: "flex",

        height: "80%",
    },
    typo: {
        fontSize: "30px",
    },
    value: {
        fontSize: "30px",
        marginTop: "5%",
    },
}));
const SummaryTile = ({ value, description, sufix }) => {
    const classes = useStyles();

    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid container direction="column" justify="center">
                        <Grid item>
                            <Typography className={classes.typo}>
                                {description}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                className={classes.value}
                                color="primary"
                            >
                                {value} {sufix}
                            </Typography>
                        </Grid>
                        <Grid item></Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SummaryTile;
