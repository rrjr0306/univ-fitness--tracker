import React from "react";

const ActivityItem = ({activities}) => {
    console.log(activities, "IN ITEMS")
    return (
        <div className="fluid ui card">
            <div className="content">
                <div className="center aligned header" style={{color: "white"}}>{activities.name}</div>
                <div className="ui small feed">
                    <div>Description: {activities.description}</div>
                </div>
            </div>
        </div>
    )
}

export default ActivityItem