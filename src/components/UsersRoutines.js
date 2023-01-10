import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteRoutine, getUserRoutines } from "../api/api";

const UsersRoutines = (props) => {
    const {token} = props;
    const { username } = useParams();
    const [userRoutines, setUserRoutines] = useState([]);

    const deleteHandler = async (routine) => {
        await deleteRoutine(token, routine);
      }

    useEffect(async() => {
        const gettingUserRoutines = await getUserRoutines(token, username);
        setUserRoutines(gettingUserRoutines)
      }, [])

    if (token) {
        return (
            <div>
                {userRoutines.map(content => {
                    const { id } = content
                    const routine = id
                    return (
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
                    <button onClick={() => {deleteHandler(routine)}}>Delete</button>
                    </div>
                    
                    )} ) }
            </div>
      );
    } else {
    
  return (
        <div>
            {userRoutines.map(content => 
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
  ); }
}
;

export default UsersRoutines;

