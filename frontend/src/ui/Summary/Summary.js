import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import SummaryFilter from "./SummaryFilter";
import SummaryView from "./SummaryView";
import { connect } from "react-redux";
import operations from "../../state/ducks/summary/operations";
import { selectToDisplay } from "../../state/ducks/summary/actions";
import {
    getCity,
    getCommunity,
    getDistrict,
    getPossibleCities,
    getPossibleCommunities,
    getPossibleDistricts,
    get_region,
} from "../../state/ducks/summary/selectors";
const Summary = ({
    summary,
    fetchSummary,
    setDisplayedSummary,
    city,
    district,
    community,
    region,
}) => {
    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return (
        <Grid container justify="center">
            {summary && (
                <SummaryFilter
                    summary={summary}
                    setDisplayedSummary={setDisplayedSummary}
                />
            )}
            {region && (
                <SummaryView
                    displayedSummary={region.summaryRegion}
                    title={"Województwo"}
                    level={"region"}
                    name={region.region}
                />
            )}
            {district && (
                <SummaryView
                    displayedSummary={district.summaryDistrict}
                    title={"Powiat"}
                    level={"district"}
                    name={district.district}
                />
            )}
            {community && (
                <SummaryView
                    displayedSummary={community.summaryCommunity}
                    title={"Gmina"}
                    level={"community"}
                    name={community.community}
                />
            )}
            {city && (
                <SummaryView
                    displayedSummary={city.summaryCity}
                    title={"Miasto"}
                    level={"city"}
                    name={city.city}
                />
            )}
        </Grid>
    );
};

const mapStatetoProps = (state) => ({
    summary: state.summary,
    region: get_region(state),
    district: getDistrict(state),
    community: getCommunity(state),
    city: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
    fetchSummary: () => operations.fetchSummary()(dispatch),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Summary);
