import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

//import { response } from "../../app";
//import { getAllActivities } from "../api";
const BASE_URL = "http://localhost:3000/api"


const Activities = ({ activity, setActivity, token }) => {
    console.log("activity", activity);
}

const handleDeleteClick = async (activityId) => {
   await setActivity((prevActivities) =>
    prevActivities.filter((item) => item._id !== activityId)
    );


return ( 
<>

<Link to="/createactivity" className="ui button">
    Create Activity
    </Link>
    <div className="posts-container">
        {activity.map((item) => {
            return (
            <ActivityItem key={item._id} item={item} headerElement={
                 item.isAuthor ?
        <div className="right floated aligned tiny header">Mine</div>
        : null
    }>
        
        
            </ActivityItem>
            )
        
        })} 
    </div>
        </>
)
    
};    
















// const Activities = () => {

//     const [activities, setActivities] = useState([]);

//     const getActivities = async () => {
//         try {
//         const response = await fetch (`${BASE_URL}/activities`, {
//             headers: {
//             'Content-Type': 'application/json'},
//           });

//         const getActivities = await response.json();
//         setActivities(response);
//     } catch (error) {
//         console.error(error)
//     }

//         };
//          useEffect(() => {
//             getActivities()
//         }, []);
    
//     return (
//         <>
//         {activities.map((activity) => {
//             return (
//                 <div>
//                     <span>{activity.name}</span>

//                     <br></br>

//                     <span>{activity.description}</span>
//                 </div>

            
//             )
//         }
//         )}
      
//         </>
//     )}
    
    }



export default Activities;