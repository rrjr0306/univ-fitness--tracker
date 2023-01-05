import React, { useState, useEffect } from "react";
import { deleteRoutine, getUserRoutines } from "../api/api";

const MyRoutines = ({ token, routines, setRoutines, username }) => {
  console.log('ROUTINES111', routines)
  const _username = window.localStorage.getItem("username")
  console.log('USERNAME', username)
  const [userRoutines, setUserRoutines] = useState([]);

  console.log('USERROUTINES!!!', userRoutines)
  // console.log('ROUTINEID', routineId)

  const deleteHandler = async (routine) => {
    console.log('DHROUTINE', routine)
    console.log('tokennn', token)
    await deleteRoutine(token, routine);
    // setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== routineId))
  }

  useEffect(async() => {
    const gettingUserRoutines = await getUserRoutines(token, _username);
    setUserRoutines(gettingUserRoutines)
  }, [])
      
  // const { creatorName }  = routines
  // console.log('CREATORNAME', creatorName)

  return (
    <div>
        { userRoutines ? userRoutines.map(content => {
          const { id } = content
          const routine = id
          return (
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
                {username == content.creatorName ? (
                <button onClick={() => {deleteHandler(routine)}}>Delete</button>
                 ) : (null)}
              </div>
            </div>
          </div>
            )}) : <div>
                  <h3>
                    No User Routines
                  </h3>
                </div>
                }
    </div>
  );
};

export default MyRoutines;

