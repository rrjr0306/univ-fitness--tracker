
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteRoutine, getUserRoutines, getSpecificUserRoutines } from "../api/api";

const UsersRoutines = (props) => {
    const { routines }  = props;
    const {token} = props;
    const { username } = useParams();
    console.log('users_username', username)
    const [userRoutines, setUserRoutines] = useState([]);




    useEffect(async() => {
        const gettingUserRoutines = await getUserRoutines(token, username);
        setUserRoutines(gettingUserRoutines)
      }, [])
    console.log('USSSERR ROUTINES', userRoutines)

    
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
  );
}
;

export default UsersRoutines;

