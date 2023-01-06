import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { deleteActivity } from "../api/api";

const Routines = ({routines, token}) => {

    console.log('MAINROUTINES', routines)

    const activityDeleteHandler = async (routineActivityId) => {
        // console.log('can you see me??!!', routineActivityId)
        await deleteActivity(token, routineActivityId)
    }  
  
  return (
        <div>
            <Link to="Routines/create">Create your own Routine!</Link>
            {routines.map(content => 
                <div key={content.id}>
                    <h2><a href={`/routines/users/${content.creatorName}`} params={{username: content.creatorName}}>Routine Creator - {content.creatorName}</a></h2>
                    <p>Name - {content.name}</p>
                    <p>Goal - {content.goal}</p>
                    <div>
                        {content.activities.map(activity =>
                            <div key={activity.id}>
                                <h3>Activity name - {activity.name}</h3>
                                <p>Activity discription - {activity.description}</p>
                                <p>Duration and Count - {activity.duration} , {activity.count}</p>
                                {token ? <button onClick={() => {activityDeleteHandler(activity.routineActivityId)}}>Delete?</button> : null}
                            </div>
                            )}
                    </div>                 
                </div>
                )}
        </div>
  );
}


export default Routines;

