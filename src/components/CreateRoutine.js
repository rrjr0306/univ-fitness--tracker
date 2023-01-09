import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createRoutine } from "../api/api"; 

const CreateRoutine = ({token, setRoutines}) => {
    const [newRoutineName, setNewRoutineName] = useState("");    
    const [ newGoal, setNewGoal ] = useState("");
    const [ newIsPublic, setNewIsPublic ] = useState(false)    
    const history = useHistory();
    
    return (<>
        <div>
            <form onSubmit={async (event) => {
                event.preventDefault();
                
                const routine = await createRoutine(token, newRoutineName, newGoal, newIsPublic);
                console.log('THIS BETTER WORK', routine);
                setRoutines((prevRoutines) => [...prevRoutines, routine]);
                setNewRoutineName("");
                setNewGoal("");
                setNewIsPublic(false);
                history.push("/Routines")
            }}>
                <input
                    placeholder="Routine Name"
                    value={newRoutineName}
                    onChange={(event) => setNewRoutineName(event.target.value)}>
                </input>
                <input
                    placeholder="Goal"
                    value={newGoal}
                    onChange={(event) => setNewGoal(event.target.value)}>
                </input>
                <div><p>isPublic?</p>
                <input               
                    type="checkbox"                
                    checked={newIsPublic}                
                    onChange={(event) => setNewIsPublic(event.target.checked)}
                />
                </div>
                <button type="submit">Create New Routine</button>
            </form>
        </div>
        
        </>)
    }


export default CreateRoutine;