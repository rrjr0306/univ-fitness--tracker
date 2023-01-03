import React from "react";
import { Link } from "react-router-dom";
import ActivityItem from "./ActivityItem";

const Activities = ({activities, setActivities, token}) => {

    return (<>
        {token ? <Link className="fluid ui button" to="/Activities/create">Create Activity</Link> : null}
        <div>
            <h1>Activities</h1>
            {activities.map((activity) => {
                return <ActivityItem 
                    key={activity.id} 
                    activities={activity}
                    setActivities={setActivities}
                    />
            })}
        </div>
    </>)
         
};


export default Activities;