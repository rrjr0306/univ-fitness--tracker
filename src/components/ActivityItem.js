import React from "react";

const ActivityItem = ({activities}) => {
    console.log(activities, "IN ITEMS")
    return (
        <div>
            <h1>Activities</h1>
            <div>{activities.name}</div>
            <div>{activities.description}</div>
        </div>
    )
}

export default ActivityItem