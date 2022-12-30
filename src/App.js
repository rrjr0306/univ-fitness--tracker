// import React from "react";
// import {Home, Activities, Routines, Myroutines} from "./components";
// import {Route, Switch} from "react-router-dom";

// // const BASE_URL = ""

// const App = () => {

// return (
// <div>
//     <NavBar />

//     <Switch>
//         <Route exact path="/" component={Home}/>
//         <Route path="/Activities" component={Activities}/>
//         <Route path="/Routines" component={Routines}/>
//         <Route path="/Myroutines" component={Myroutines}/>
//     </Switch>

// </div>

// )
// }


// export default App;



import React, { useState, useEffect } from "react";
import { Home, Activities, Routines, Myroutines } from "./components";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { getRoutines, fetchGuest } from "./api/api";
import "./App.css";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [guest, setGuest] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const getRoutines = async () => {
        const {error, routines} = await getRoutines(token);

        if (error) {
            console.error(error);
        }
        setRoutines(routines);
      };
    getRoutines();
  }, [token]);

  useEffect(() => {
    if (token) {
        const getGuest = async () => {
            const { username } = await fetchGuest(token);
            // console.log("username", username);
            setGuest(username)
        };
        getGuest();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
        window.localStorage.setItem("token", token);
    } else {
        window.localStorage.removeItem("token");
    }    
  }, [token]);

  const logOut = () => {
    setToken("");
    setGuest(null);    
    navigate("/");
  }

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/routines">
          Routines
        </Link>
        <div className="right menu">
          {token ? (
            <button style={{fontFamily: 'itc-benguiat, serif'}} onClick={logOut} className="item">Log Out</button>
          ) : (
            <>
              <Link className="item" to="/account/login">
                Log In
              </Link>
              <Link className="item" to="/account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home guest={guest} />} />
        <Route path="/routines/create" element={<CreateRoutineForm token={token} setRoutines={setRoutines} />} />
        <Route path="/routines/:routineId" element={<RoutineDetails routines={routines} token={token} getRoutines={getRoutines}/>} />
        <Route path="/routines" element={<Routines routines={routines} token={token} setRoutines={setRoutines} />} />
        <Route
          path="/account/:action"
          element={<AccountForm setToken={setToken} />}
        />
      </Routes>
    </div>
  );
};

export default App;


