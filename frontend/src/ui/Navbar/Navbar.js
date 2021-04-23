import React, { useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return <Tab component={Link} to={props.link} {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

        backgroundColor: theme.palette.background.paper,
    },
    tab: {
        marginLeft: "auto",
        marginRight: theme.spacing(2),
    },
    appbar: {},
}));

function NavBar({ user }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const url = useLocation();
    useEffect(() => {
        const path = url.pathname;
        if (path === "/") setValue(0);
        else if (path === "/users") setValue(2);
        else setValue(1);
    }, [url, setValue]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    value={value}
                    aria-label="nav tabs example"
                    className={classes.tab}
                    textColor="white"
                >
                    <LinkTab
                        label="Dane Statystyczne"
                        link="/"
                        {...a11yProps(0)}
                    />
                    {user.loggedIn && (
                        <LinkTab
                            label="Formularz"
                            link="/form"
                            {...a11yProps(1)}
                        />
                    )}

                    {!user.loggedIn && (
                        <LinkTab
                            label="Logowanie"
                            link="/login"
                            {...a11yProps(1)}
                        />
                    )}
                    {user.isAdmin && (
                        <LinkTab
                            label="Lista osób"
                            link="/users"
                            {...a11yProps(1)}
                        />
                    )}
                </Tabs>
            </AppBar>
        </div>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps, null)(NavBar);
