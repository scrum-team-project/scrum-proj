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
    },
    typo: {
        fontSize: "30px",
    },
    value: {
        fontSize: "30px",
        marginTop: "5%",
    },
}));
const SummaryTile = ({ value, description }) => {
    const classes = useStyles();

    return (
        <Grid item md={4} sm={6} xs={12}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.typo}>
                        {description}
                    </Typography>
                    <Typography className={classes.value} color="primary">
                        {value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default SummaryTile;
