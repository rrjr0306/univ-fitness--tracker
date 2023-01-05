import React, { useState } from "react";
import { deleteRoutine } from "../api/api";

const MyRoutines = ({ token, routines, setRoutines, username }) => {
  console.log('ROUTINES111', routines)
  
  const [userRoutines, setUserRoutines] = useState([]);

  const deleteHandler = async (routineId) => {
    await deleteRoutine(token, routineId);
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== routineId))
  }
  
  




    
  return (
    <div>
        { userRoutines ? userRoutines.map(content =>
          <div className="fluid ui card">
            <div className="content">
              <div key={content.id}>
                <h2 className="center aligned ui header">Routine Creator - {content.creatorName}</h2>
                  <p className="center aligned ui sub header">Name - {content.name}</p>
                  <p className="ui small feed">Goal - {content.goal}</p>
                <div>
                    {content.activities.map(activity =>
                        <div key={activity.id}>
                            <h3 className="center aligned ui sub header">Activity name - {activity.name}</h3>
                            <p className="ui small feed">Activity discription - {activity.description}</p>
                            <p className="ui small feed">Duration and Count - {activity.duration} , {activity.count}</p>
                        </div>
                        )}
                </div>
                {username.id == creatorId ? (
                <button onClick={() => {deleteHandler(routine.id)}}>Delete</button>
                 ) : (null)}
              </div>
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

