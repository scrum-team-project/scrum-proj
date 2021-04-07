import { Grid } from "@material-ui/core";
import React from "react";
import SummaryView from "./SummaryView";
const Summary = () => {
    return (
        <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
                Filter
            </Grid>

            <SummaryView />
        </Grid>
    );
};
export default Summary;
