import { Grid } from "@material-ui/core";
import React from "react";
import SummaryTile from "./SummaryTile";

const SummaryView = () => {
    return (
        <Grid item container xs={12} md={10} justify="center" spacing={3}>
            <SummaryTile />
            <SummaryTile />
            <SummaryTile />
        </Grid>
    );
};

export default SummaryView;
