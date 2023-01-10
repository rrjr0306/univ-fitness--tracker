// import React from "react";
// import { deleteRoutine, getUserRoutines } from "../api/api";


// const MyRoutines = ({ token, routines, username }) => {

//   console.log('ROUTINES111', routines)
  // const _username = window.localStorage.getItem("username")
//   console.log('USERNAME', username)
//   const history = useHistory();

  
//   console.log('ROUTINEID', routineId)

//   const routineDeleteHandler = async (routine) => {
//     console.log('DHROUTINE', routine)
//     console.log('tokennn', token)
//     await deleteRoutine(token, routine);
//     setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== routineId))
  

//   useEffect(() => {
//     const gettingUserRoutines = async () => {
//       const userRoutines = await getUserRoutines(token, username);
//       setUserRoutines(userRoutines);
//     }
//     gettingUserRoutines();
//   }, [token])
//   const { creatorName }  = routines
//   console.log('CREATORNAME', creatorName)

//   const routineDetail = routines.find((aRoutine) => {
//     const foundRoutine = aRoutine.creatorName == username;
//     return foundRoutine
//   })

// //   const activityDeleteHandler = async (activityId) => {
// //     await deleteActivity(token, routineAcctivityId)
// // }
  
//     return (<>
//      {routineDetail && routines.map((routine) => 
//           <div key={routine.id}>
//               <h2><a href={`/routines/users/${routine.creatorName}`} params={{username: routine.creatorName}}>Routine Creator - {routine.creatorName}</a></h2>
//               <p>Name - {routine.name}</p>
//               <p>Goal - {routine.goal}</p>               
//           </div>
//      )}
//     </>)
// };
// }

// export default MyRoutines


//THIS IS THE SECOND ONE!!!!***********************


// import React, { useEffect, useState } from "react";
// import { getUserRoutines, deleteRoutine } from "../api/api";

// const MyRoutines = ({ token, routines }) => {
//   console.log('ROUTINES111', routines)
//   const username = window.localStorage.getItem("username")

//   const [userRoutines, setUserRoutines] = useState([]);

//   const deleteHandler = async (event) => {
//     event.preventDefault();
//     const deletedRoutine = await deleteRoutine(token, routine)
//     return deletedRoutine
//   }

//   useEffect(async() => {
//     const gettingUserRoutines = await getUserRoutines(token, username);
//     setUserRoutines(gettingUserRoutines)
//   }, [])





//   return (
//     <div>
//         { userRoutines ? userRoutines.map(content =>
//             <div key={content.id}>
//                <h2>Routine Creator - {content.creatorName}</h2>
//                 <p>Name - {content.name}</p>
//                 <p>Goal - {content.goal}</p>
//                 <div>
//                     {content.activities.map(activity =>
//                         <div key={activity.id}>
//                             <h3>Activity name - {activity.name}</h3>
//                             <p>Activity discription - {activity.description}</p>
//                             <p>Duration and Count - {activity.duration} , {activity.count}</p>
//                         </div>
//                         )}
//                 </div>
//                 <div onSubmit={(event) => deleteHandler(e, {token, routine})}>
//                 <button type='submit'>Delete</button>
//                 </div>      
//             </div>
//             ) : <div>
//                   <h3>
//                     No User Routines
//                   </h3>
//                 </div>
//                 }
//     </div>
//   );
// };
// export default MyRoutines;



//************THIS IS THE THIRD ONE */

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { deleteRoutine, getUserRoutines, getSpecificUserRoutines } from "../api/api";

// const MyRoutines = (props) => {
//     const username = window.localStorage.getItem("username")
//     const { routines }  = props;
//     const {token} = props;
//     // const { username } = useParams();
//     const [userRoutines, setUserRoutines] = useState([]);

//     // usersRoutines = await getSpecificUserRoutines(username)

//     useEffect(async() => {
//         const gettingUserRoutines = await getUserRoutines(token, username);
//         setUserRoutines(gettingUserRoutines)
//       }, [])

//     console.log('USSSERR ROUTINES', userRoutines)

//   return (
//         <div>
//             {userRoutines.map(content => 
//                 <div key={content.id}>
//                     <h2>Routine Creator - {content.creatorName}</h2>
//                     <p>Name - {content.name}</p>
//                     <p>Goal - {content.goal}</p>
//                     <div>
//                         {content.activities.map(activity =>
//                             <div key={activity.id}>
//                                 <h3>Activity name - {activity.name}</h3>
//                                 <p>Activity discription - {activity.description}</p>
//                                 <p>Duration and Count - {activity.duration} , {activity.count}</p>
//                             </div>
//                             )}
//                     </div>                 
//                 </div>
//                 )}
//         </div>
//   );
// }
// ;

// export default MyRoutines;




//***************THIS IS GOING TO WORK: */

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

