import React, {useEffect, useState} from "react";
import {Home, Activities, Routines, Myroutines, AccountForm} from "./components";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import {fetchGuest} from "./api/api"
import ActivityCreateForm from "./components/CreateActivity";

const App = () => {

  const [username, setUsername] = useState(null)
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );

    const history = useHistory();

    useEffect(() => {
        if (token) {
            const getGuest = async () => {
                const {username} = await fetchGuest(token);
                console.log("RESULT", username)
                setUsername(username)
            };
            getGuest();
        }
    }, [token])

    useEffect(() => {
        if (token) {
            window.localStorage.setItem("token", token)
        } else {
            window.localStorage.removeItem("token")
        }
    }, [token])

    const logOut = () => {
        setToken(null);
        setUsername(null);
        history.push('/');
    }

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Activities">Activities</Link>
                <Link to="/Routines">Routines</Link>
                <Link to="/Myroutines">My Routines</Link>
                <div className="right menu">
                    {token ? (
                        <button onClick={(event) => {
                            event.preventDefault();
                            logOut();
                        }}>Log Out</button>
                    ):(
                    <>
                        <Link to="/AccountForm/login">
                            Log In
                        </Link>
                        <Link to="/AccountForm/register">
                            Sign Up    
                        </Link>    
                    </>
                    )}
                </div>
            </nav>

            <Switch>
                <Route exact path="/" >
                    <Home username={username}/>
                </Route>
                <Route path="/activity/create">
                    <ActivityCreateForm token={token} setActivity={setActivity} />
                </Route>
                <Route path="/Routines">
                    <Routines />
                </Route>
                <Route path="/Myroutines">
                    <Myroutines />
                </Route>
                <Route path="/AccountForm/:action">
                    <AccountForm setToken={setToken}/>
                </Route>
            </Switch>

        </div>

    );
};








export default App;


