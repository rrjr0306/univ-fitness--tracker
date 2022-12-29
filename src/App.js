import React, {useState} from "react";
import {Home, Activities, Routines, Myroutines, AccountForm} from "./components";
import {Link, Route, Switch} from "react-router-dom";
// const BASE_URL = ""

const App = () => {

    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );

    return (
        <div>
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to="/Activities">
                    Activities
                </Link>
                <Link to="/Routines">
                    Routines
                </Link>
                <Link to="/Myroutines">
                    My Routines
                </Link>
                <div className="right menu">
                    {token}
                </div>
            </nav>

            <Switch>
                <Route exact path="/" >
                    <Home />
                </Route>
                <Route path="/Activities">
                    <Activities />
                </Route>
                <Route path="/Routines">
                    <Routines />
                </Route>
                <Route path="/Myroutines">
                    <Myroutines />
                </Route>
                <Route path="/AccountForm/:action">
                    <AccountForm />
                </Route>
            </Switch>

        </div>

    );
};








export default App;