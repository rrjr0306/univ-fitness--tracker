
import React, { useState, useEffect } from "react";
import { getRoutines, getUserRoutines } from "../api/api"

const Routines = () => {
    const [routine, setRoutine] = useState([])
    useEffect(async() => {
      const gettingRoutines = await getUserRoutines();        

        setRoutine(gettingRoutines)   
    }, []);
    console.log(routine)
    
  return (
    <div>
        {routine.map(content =>
            <div key={content.id}>
               <h2>Routine Creator - {content.creatorName}</h2>
                <p>Name - {content.name}</p>
                <p>Goal - {content.goal}</p>
                <div>
                    {content.activities.map(activity =>
                        <div key={activity.id}>
                            <h3>Activity name - {activity.name}</h3>
                            <p>Activity discription - {activity.description}</p>
                            <p>Duration and Count - {activity.duration} , {activity.count}</p>
                        </div>
                        )}
                </div>                 
            </div>
            )}
    </div>
  );
};

export default Routines;

