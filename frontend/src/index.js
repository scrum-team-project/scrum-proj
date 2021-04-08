import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import teal from "@material-ui/core/colors/teal";
import blue from "@material-ui/core/colors/blue";
import store from "./state/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: blue,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
