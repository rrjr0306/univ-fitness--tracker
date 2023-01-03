import React, { useEffect, useState } from "react";
import { getUserRoutines, deleteRoutine } from "../api/api";

const MyRoutines = ({ token, routines }) => {
  console.log('ROUTINES111', routines)
  const username = window.localStorage.getItem("username")
  
  const [userRoutines, setUserRoutines] = useState([]);



  const deleteHandler = async (event) => {
    event.preventDefault();
    const routine = userRoutines[0].id
    await deleteRoutine(token, routine)
  }
  
  useEffect(async() => {
    const gettingUserRoutines = await getUserRoutines(token, username);
    setUserRoutines(gettingUserRoutines)
  }, [])

  

  console.log('routines!!!!', routines.id)


  //need routines.id for line 50 in event handler
    
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
                <div >
                
                <button onClick={(event) => deleteHandler(event, { token, routines })} type='submit'>Delete</button>
                </div>      
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

