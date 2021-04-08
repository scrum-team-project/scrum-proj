import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import SummaryFilter from "./SummaryFilter";
import SummaryView from "./SummaryView";
import { connect } from "react-redux";
import operations from "../../state/ducks/summary/operations";
import { selectToDisplay } from "../../state/ducks/summary/actions";
const Summary = ({ summary, fetchSummary, setDisplayedSummary }) => {
    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return (
        <Grid container justify="center">
            {summary && (
                <SummaryFilter
                    summary={summary.allData}
                    setDisplayedSummary={setDisplayedSummary}
                />
            )}
            {summary && Object.keys(summary.displayed).length !== 0 && (
                <SummaryView
                    displayedSummary={summary.displayed.podsumowanie}
                />
            )}
        </Grid>
    );
};

const mapStatetoProps = (state) => ({
    summary: state.summary,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSummary: () => operations.fetchSummary()(dispatch),
    setDisplayedSummary: (object) => dispatch(selectToDisplay(object)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Summary);
