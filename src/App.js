import React from "react";
import {Home, Activities, Routines, Myroutines} from "./components";
import {Link, Route, Switch} from "react-router-dom";
// const BASE_URL = ""

const App = () => {

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
                <div>
                    <Link to="/Login">
                        Log In
                    </Link>
                    <Link to="/Signup">
                        Sign Up
                    </Link>
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
            </Switch>

        </div>

    );
};








export default App;