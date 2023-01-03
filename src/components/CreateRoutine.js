import React, { useState, useEffect } from "react";
import { createRoutine, getUserRoutines } from "../api/api"; 

const CreateRoutine = (props) => {
    const { newRoutine, setNewRoutine } = useState("");    
    const [ newGoal, setNewGoal ] = useState("");
    const [ newIsPublic, setNewIsPublic ] = useState(false)    
    const [ routine, setRoutine ] = useState([])

    console.log('myroutines..', newRoutine)

    useEffect(async() => {
        const gettingRoutines = await getUserRoutines();
        setRoutine(gettingRoutines)
    }, []);

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const submitRoutine = await createRoutine(newRoutine, newGoal, newIsPublic);
        setNewRoutine("");
        setNewGoal("");
        setNewIsPublic("");
        setRoutine([submitRoutine, ...routine])
    }
    console.log('username??!??!', newRoutine )
    return (
        <>
            <div>
                <input
                    placeholder="Routine Name"
                    value={newRoutine}
                    onChange={(event) => setNewRoutine(event.target.value)}>
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
                <button onClick={handleOnSubmit}>Create New Routine</button>
            </div>
        </>
        
        )
    }


export default CreateRoutine;