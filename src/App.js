import React from "react";
import {Home, Activities, Routines, Myroutines} from "./components";
import {Route, Switch} from "react-router-dom";

// const BASE_URL = ""

const App = () => {

return (
<div>
    <NavBar />

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/Activities" component={Activities}/>
        <Route path="/Routines" component={Routines}/>
        <Route path="/Myroutines" component={Myroutines}/>
    </Switch>

</div>

)
}








export default App;