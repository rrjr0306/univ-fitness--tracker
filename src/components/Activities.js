import React, { useState, useEffect } from "react";
import { response } from "../../app";
import { getAllActivities } from "../api";
const BASE_URL = "http://fitness-tracker-z419.onrender.com/api"

const Activities = (props) => {

    const [activities, setActivities] = useState([]);

    const getActivities = async () => {
        const response = await fetch (`${BASE_URL}/activities`, {
            headers: {
            'Content-Type': 'application/json'},
          });

        const theActivities = await response.json();
        setActivities(response);
    } catch (error) {
        console.error(error)
    }

        };
         useEffect(() => {
            getActivities()
        }, []);
    
    return (
        <>
        {activities.map((activity) => {
            return (
                <div>
                    <span>{activity.name}</span>

                    <br></br>

                    <span>{activity.description}</span>
                </div>

            
            )
        }
        )}
      
        </>
    )
    
    



export default Activities;