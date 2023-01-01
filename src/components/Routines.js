

import React, { useState, useEffect } from "react";
const BASE_URL = 'http://localhost:3000/api'

export const getRoutines = async () => {
    const url = `${BASE_URL}/Routines`;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }           
        })    
    const json = await response.json()    
    return json;
} catch (error){console.error(error, "Something's wrong with getting routines!")}
} 

const Routines = () => {
    //const [allRoutines, setAllRoutines] = useState({});
    const [routine, setRoutine] = useState([])
    useEffect(async() => {
      const gettingRoutines = await getRoutines();        
        //setAllRoutines(gettingRoutines);
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