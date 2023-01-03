import React from "react";


const MyRoutines = ({routines}) => {
    
    // useEffect(async() => {
    //   const gettingUserRoutines = async () => {      
    //     const result = await getUserRoutines(token)
    //     setRoutines(result);
    //   }
    //   gettingUserRoutines();
    // }, [token]);
    // console.log(routines)
    
  return (
    <div>
        {routines.map(content =>
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

export default MyRoutines;

