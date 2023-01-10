import React, {useEffect, useState} from "react";
import {Home, Routines, MyRoutines, ActivityItem, AccountForm, Activities, CreateActivity, CreateRoutine, EditMyRoutines, UsersRoutines} from "./components";
import {Link, Route, Switch, useHistory} from "react-router-dom";
import {fetchGuest, fetchActivities, getRoutines} from "./api/api"


const App = () => {

    const [activities, setActivities] = useState([]);
    const [routines, setRoutines] = useState([]);
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
                setUsername(username)
            };
            getGuest();
        }
    }, [token])

    useEffect(() => {
        try {
            const gettingRoutines = async () => { 
                const routines = await getRoutines(); 
                console.log("ROUTINESSSSS", routines)    
                setRoutines(routines);
            }
            gettingRoutines();
        } catch(error) {
            console.error("Error fetching routines", error)
        }   
      }, []);

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
        <div className="container">
            <nav className="ui secondary menu">
                <Link className="item" style={{color: "white"}} to="/">
                    Home
                </Link>
                <Link className="item" style={{color: "white"}} to="/Activities">
                    Activities
                </Link>
                <Link className="item" style={{color:"white"}} to="/Routines">
                    Routines
                </Link>
                {token? <Link className="item" style={{color: "white"}} to={"/routines/users/" + username}>
                    My Routines
                </Link> : null}

                <div className="right menu">
                    {token ? (
                        <button className="ui item" style={{color: "white"}} onClick={(event) => {
                            event.preventDefault();
                            logOut();
                        }}>Log Out</button>
                    ):(
                    <>
                        <Link className="ui item" style={{color: "white"}} to="/AccountForm/login">
                            Log In
                        </Link>
                        <Link className="ui item" style={{color: "white"}} to="/AccountForm/register">
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
                <Route path="/routine_activities/:activityId">
                    <ActivityItem activities={activities} setActivities={setActivities} token={token} />
                </Route>
                <Route path="/Activities/create">
                    <CreateActivity token={token} setActivities={setActivities}/>
                </Route>
                <Route path="/Activities">
                    <Activities activities={activities} setActivities={setActivities} token={token} />
                </Route>
                <Route path="/Routines/create">
                    <CreateRoutine token={token} setRoutines={setRoutines}/>
                </Route>               
                <Route path="/Routines/users/:username">
                    <UsersRoutines routines={routines} username={username} token={token}/>
                </Route>                
                {/* <Route path="/Routines/:routineId">
                    <RoutineItem routines={routines} token={token}/>
                </Route> */}
 
                <Route path="/Routines">
                    <Routines routines={routines} token={token} setActivities={setActivities}/>
                </Route>
                <Route path="MyRoutines/edit">
                    <EditMyRoutines token={token} routines={routines} />
                </Route>
                <Route path="/MyRoutines">
                    <MyRoutines username={username} routines={routines} setRoutines={setRoutines} token={token}/>
                </Route>
                <Route path="/AccountForm/:action">
                    <AccountForm setToken={setToken}/>
                </Route>
            </Switch>

        </div>

    );
};








export default App;


