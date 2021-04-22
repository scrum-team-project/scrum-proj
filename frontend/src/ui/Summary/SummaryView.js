import { Grid, makeStyles, Typography, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import SummaryTile from "./SummaryTile";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
    },
    textContainer: {
        textAlign: "center",
        cursor: "pointer",
    },
}));
const SummaryView = ({ displayedSummary, title, level, name }) => {
    const classes = useStyles();
    const [visible, setVisible] = useState(true);

    return (
        <Grid
            item
            container
            xs={12}
            md={10}
            justify="center"
            spacing={5}
            className={classes.container}
        >
            <Grid
                item
                xs={12}
                md={10}
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h4" className={classes.textContainer}>
                    {title}: {name}
                </Typography>
                <IconButton onClick={() => setVisible((prev) => !prev)}>
                    {visible ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
            </Grid>
            {visible && (
                <>
                    <SummaryTile
                        description="Liczba mieszkańców:"
                        value={displayedSummary.population}
                    />
                    <SummaryTile
                        description="Liczba ludzi pracujących:"
                        value={displayedSummary.workingPopulation}
                    />
                    <SummaryTile
                        description="Procent ludzi pracujących:"
                        value={displayedSummary.workingPercentage}
                        sufix="%"
                    />
                </>
            )}
        </Grid>
    );
};

export default SummaryView;
