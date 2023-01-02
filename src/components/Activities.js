import React from "react";
import ActivityItem from "./ActivityItem";

//import { response } from "../../app";
//import { getAllActivities } from "../api";



const Activities = ({activities}) => {

    console.log("ACTIVITIES", activities)
    return (
        
        <div>
            {activities.map((activity) => {
                return <ActivityItem key={activity.id} activities={activity}/>
            })}
        </div>
    )
         
};


export default Activities;