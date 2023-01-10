import React from "react";
import { Link } from "react-router-dom";
import { deleteRoutineActivity } from "../api/api";

const Routines = ({routines, token, setActivities}) => {
    if (!routines) {
        return (<h1>Loading</h1>)
      }

    const activityDeleteHandler = async (routineActivityId) => {
        await deleteRoutineActivity(token, routineActivityId)
        setActivities((prevActivities) => prevActivities.filter((activity) => activity.routineActivityId !== routineActivityId))
    }  

    return (
        <div>
            <Link to="Routines/create">Create your own Routine!</Link>
            {Array.isArray(routines) && routines.map((routine) => 
                <div key={routine.id}>
                    <h2><a href={`/routines/users/${routine.creatorName}`} params={{username: routine.creatorName}}>Routine Creator - {routine.creatorName}</a></h2>
                    <p>Name - {routine.name}</p>
                    <p>Goal - {routine.goal}</p>
                    <div>
                        {routine.activities && routine.activities.map(activity =>
                            <div key={activity.id}>
                                <h3>Activity name - {activity.name}</h3>
                                <p>Activity discription - {activity.description}</p>
                                <p>Duration and Count - {activity.duration} , {activity.count}</p>
                                {token ? <button onClick={() => activityDeleteHandler(activity.routineActivityId)}>Delete?</button> : null}
                            </div>
                        )}
                    </div>                 
                </div>
            )}
        </div>
  );
}


export default Routines;

