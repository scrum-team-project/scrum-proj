import { Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
    selectToDisplayCity,
    selectToDisplayCommunity,
    selectToDisplayDistrict,
    selectToDisplayRegion,
} from "../../state/ducks/summary/actions";
import {
    getPossibleCities,
    getPossibleCommunities,
    getPossibleDistricts,
} from "../../state/ducks/summary/selectors";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const SummaryFilter = ({
    summary,
    selectCity,
    selectRegion,
    selectCommunity,
    selectDistrict,
    possibleDistricts,
    possibleCommunities,
    possibleCities,
    district,
    region,
    community,
    city,
}) => {
    const handleSelection = (dispatcher) => (e) => {
        dispatcher(e.target.value);
    };
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <form
                style={{
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                }}
            >
                <FormControl className={classes.formControl}>
                    <InputLabel id="outlined-basic">Województwo</InputLabel>
                    <Select
                        id="outlined-basic"
                        value={region}
                        name="region"
                        onChange={handleSelection(selectRegion)}
                    >
                        {summary.allData &&
                            summary.allData.map((voivod) => (
                                <MenuItem
                                    key={voivod.region}
                                    value={voivod.region}
                                >
                                    {voivod.region}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} disabled={!region}>
                    <InputLabel id="outlined-basic">Powiat</InputLabel>
                    <Select
                        id="outlined-basic"
                        value={district}
                        name="region"
                        onChange={handleSelection(selectDistrict)}
                    >
                        {possibleDistricts &&
                            possibleDistricts.map((dist) => (
                                <MenuItem key={dist} value={dist}>
                                    {dist}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    disabled={!district}
                >
                    <InputLabel id="outlined-basic">Gmina</InputLabel>
                    <Select
                        id="outlined-basic"
                        value={community}
                        name="region"
                        onChange={handleSelection(selectCommunity)}
                    >
                        {possibleCommunities &&
                            possibleCommunities.map((dist) => (
                                <MenuItem key={dist} value={dist}>
                                    {dist}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    disabled={!community}
                >
                    <InputLabel id="outlined-basic">Miasto</InputLabel>
                    <Select
                        id="outlined-basic"
                        value={city}
                        name="region"
                        onChange={handleSelection(selectCity)}
                    >
                        {possibleCommunities &&
                            possibleCommunities.map((dist) => (
                                <MenuItem key={dist} value={dist}>
                                    {dist}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </form>
        </Grid>
    );
};
const mapStateToProps = (state) => {
    return {
        possibleDistricts: getPossibleDistricts(state),
        possibleCommunities: getPossibleCommunities(state),
        possibleCities: getPossibleCities(state),
        district: state.summary.displayed.district,
        region: state.summary.displayed.region,
        community: state.summary.displayed.community,
        city: state.summary.displayed.city,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectRegion: (region) => dispatch(selectToDisplayRegion(region)),
        selectDistrict: (district) =>
            dispatch(selectToDisplayDistrict(district)),
        selectCommunity: (community) =>
            dispatch(selectToDisplayCommunity(community)),
        selectCity: (city) => dispatch(selectToDisplayCity(city)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SummaryFilter);
