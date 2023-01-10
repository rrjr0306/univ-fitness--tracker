import React from "react";
import { deleteRoutine, getUserRoutines } from "../api/api";


const MyRoutines = ({ token, routines, username }) => {

  // console.log('ROUTINES111', routines)
  // const _username = window.localStorage.getItem("username")
  // console.log('USERNAME', username)
  // const history = useHistory();

  
  // console.log('ROUTINEID', routineId)

  // const routineDeleteHandler = async (routine) => {
  //   console.log('DHROUTINE', routine)
  //   console.log('tokennn', token)
  //   await deleteRoutine(token, routine);
    // setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== routineId))
  

  // useEffect(() => {
  //   const gettingUserRoutines = async () => {
  //     const userRoutines = await getUserRoutines(token, username);
  //     setUserRoutines(userRoutines);
  //   }
  //   gettingUserRoutines();
  // }, [token])d
  // const { creatorName }  = routines
  // console.log('CREATORNAME', creatorName)

  const routineDetail = routines.find((aRoutine) => {
    const foundRoutine = aRoutine.creatorName == username;
    return foundRoutine
  })

//   const activityDeleteHandler = async (activityId) => {
//     await deleteActivity(token, routineAcctivityId)
// }
  
    return (<>
     {routineDetail && routines.map((routine) => 
          <div key={routine.id}>
              <h2><a href={`/routines/users/${routine.creatorName}`} params={{username: routine.creatorName}}>Routine Creator - {routine.creatorName}</a></h2>
              <p>Name - {routine.name}</p>
              <p>Goal - {routine.goal}</p>               
          </div>
     )}
    </>)
};

export default MyRoutines
