import React from "react";
import {Link} from "react-router-dom";

const NavBar = () => {

    return(
        <div>
            <nav>
                <div>
                    <p>Fitness Tracker</p>
                </div>

                <div>
                    <Link to ="/">Home</Link>
                </div>

                <div>
                    <Link to="/Activities">Activities</Link>
                </div>

                <div>
                    <Link to="/Routines">Routines</Link>
                </div>

                <div>
                    <Link to="/Myroutines">My Routines</Link>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;