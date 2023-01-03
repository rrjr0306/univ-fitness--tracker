import React from "react";
import {Link} from "react-router-dom";
import './Home.css';


const Home = ({username, token}) => {
    return (
        <div>
            <h1>Welcome to Fitness Tracker!</h1>
            {username || token ? <h3>You are logged in as: {username}</h3> : (
            <div>
                <h2>Please <Link to="AccountForm/login">Log In</Link></h2>
                <h3>Not a member? <Link to="AccountForm/register">Sign Up!</Link></h3>
                <img src= 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'></img>
            </div>
            )}
        </div>
    )
}

export default Home;