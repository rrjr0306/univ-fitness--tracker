// import React from 'react';

// import ActivityItem from "./ActivityItem";

// const RoutineItem = ({ routines }) => {
//     console.log('each routine goes here', routines)
//     return ( 
//          <div>
//             <span><h3>{routines.name}</h3></span>
//             <span><h3>created by {routines.creatorName}</h3></span>
//             <span>Goal: {routines.goal}</span>
//             <span>Public: {routines.isPublic ? 'yes': 'no' }</span>

//             {<div>
//                 <span>Activities:</span>
//                 <ul>
//                 {
//                  routines.activities.map(activity => <li key={activity.id}>
//                      <ActivityItem activities={activity}>
//                      {
//                         <>
//                             <span>Count: {activity.count}</span>
//                             <span>Duration: {activity.duration}</span>
//                         </>
//                      }
//                     </ActivityItem>
//                 </li>)
//                 }
//                 </ul>
//             </div>
//             }
//         </div>
//     )
// };

// export default RoutineItem;