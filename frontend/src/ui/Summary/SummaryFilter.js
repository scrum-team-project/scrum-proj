import { Button, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useFormik } from "formik";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(2),
    },
}));

const SummaryFilter = ({ summary, setDisplayedSummary }) => {
    const formik = useFormik({
        initialValues: {
            voivod: "",
        },
        onSubmit: (values) => {
            const selected = summary.find(
                (el) => el.wojewodztwo === values.voivod
            );

            setDisplayedSummary(selected);
        },
    });
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <form
                onSubmit={formik.handleSubmit}
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
                        value={formik.values.voivod}
                        name="voivod"
                        onChange={formik.handleChange}
                    >
                        {summary &&
                            summary.map((voivod) => (
                                <MenuItem
                                    key={voivod.wojewodztwo}
                                    value={voivod.wojewodztwo}
                                >
                                    {voivod.wojewodztwo}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    type="sumbit"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                >
                    Akceptuj
                </Button>
            </form>
        </Grid>
    );
};

export default SummaryFilter;
