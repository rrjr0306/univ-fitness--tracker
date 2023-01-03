import React, { useEffect, useState } from "react";
import { getUserRoutines, deleteRoutine } from "../api/api";

const MyRoutines = ({ token, routines }) => {
  console.log('ROUTINES111', routines)
  const username = window.localStorage.getItem("username")
  
  const [userRoutines, setUserRoutines] = useState([]);

  const deleteHandler = async (event) => {
    event.preventDefault();
    const deletedRoutine = await deleteRoutine(token, routine)
    return deletedRoutine
  }
  
  useEffect(async() => {
    const gettingUserRoutines = await getUserRoutines(token, username);
    setUserRoutines(gettingUserRoutines)
  }, [])




    
  return (
    <div>
        { userRoutines ? userRoutines.map(content =>
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
                <div onSubmit={(event) => deleteHandler(e, {token, routine})}>
                <button type='submit'>Delete</button>
                </div>      
            </div>
            ) : <div>
                  <h3>
                    No User Routines
                  </h3>
                </div>
                }
    </div>
  );
};

export default MyRoutines;

