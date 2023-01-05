import React from "react";
import { Link } from "react-router-dom";

const Routines = ({routines}) => {
    
    console.log('MAINROUTINES', routines)
  
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
                            </div>
                            )}
                    </div>                 
                </div>
                )}
        </div>
  );
}


export default Routines;

