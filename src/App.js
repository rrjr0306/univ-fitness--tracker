import React, {useEffect, useState} from "react";
import {Home, Routines, Myroutines, AccountForm, Activities, CreateActivity} from "./components";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import {fetchGuest, fetchActivities} from "./api/api"


const App = () => {

    const [activities, setActivities] = useState([]);
    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || null
    );

    const history = useHistory();

    useEffect(() => {
        const getActivities = async () => {
            try{
                const result = await fetchActivities(token);
                setActivities(result);
            } catch(error) {
                console.error("There was an error fetching activities", error)
            }
        }
        getActivities();
        
    }, [])

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

                <Link to="/">
                    Home
                </Link>
                <Link to="/Activities">
                    Activities
                </Link>
                <Link to="/Routines">
                    Routines
                </Link>
                {token? <Link to="/Myroutines">
                    My Routines
                </Link> : null}

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
                    <Home username={username} token={token}/>
                </Route>
                <Route path="/Activities/create">
                    <CreateActivity token={token} setActivities={setActivities}/>
                </Route>
                <Route path="/Activities">
                    <Activities activities={activities} setActivities={setActivities} token={token} />
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


