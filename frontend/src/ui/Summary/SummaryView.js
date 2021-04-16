import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import SummaryTile from "./SummaryTile";
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
    },
}));
const SummaryView = ({ displayedSummary }) => {
    const classes = useStyles();
    return (
        <Grid
            item
            container
            xs={12}
            md={10}
            justify="center"
            spacing={3}
            className={classes.container}
        >
            <SummaryTile
                description="Liczba mieszkańców:"
                value={displayedSummary.liczbaMieszkancow}
            />
        </Grid>
    );
};

export default SummaryView;
