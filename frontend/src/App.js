import "./App.css";
import LoginForm from "./ui/Login/LoginForm";
import Summary from "./ui/Summary/Summary";
import CensusForm from "./ui/Census/CensusForm";
import NavBar from "./ui/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Switch>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/form">
                    <CensusForm />
                </Route>
                <Route path="/">
                    <Summary />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
