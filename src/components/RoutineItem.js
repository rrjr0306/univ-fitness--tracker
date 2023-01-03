import React from 'react';

import ActivityItem from "./ActivityItem";

const RoutineItem = ({ children, routine }) => {
    console.log('each routine goes here', routine)
    return ( 
         <div>
            <span><h3>{routine.name}</h3></span>
            <span><h3>created by {routine.creatorName}</h3></span>
            <span>Goal: {routine.goal}</span>
            <span>Public: {routine.isPublic ? 'yes': 'no' }</span>

            { children }

            {<div>
                <span>Activities:</span>
                <ul>
                {
                 routine.activities.map(activity => <li key={activity.id}>
                     <ActivityItem activities={activity}>
                     {
                        <>
                            <span>Count: {activity.count}</span>
                            <span>Duration: {activity.duration}</span>
                        </>
                     }
                    </ActivityItem>
                </li>)
                }
                </ul>
            </div>
            }
        </div>
    )
};

export default RoutineItem;