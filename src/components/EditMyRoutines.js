import React, { useState, useEffect } from "react";
import { updateRoutine, getUserRoutines } from "../api/api"; 



const EditMyRoutines = ({ routine }) => {
    const token = localStorage.getItem('Token')
    const [updateIsPublic, setUpdateIsPublic] = useState(false)
    const [updateName, setUpdateName] = useState("")
    const [updateGoal, setUpdateGoal] = useState("")
 
    const editFields = { token, routine }

    console.log('what is routine?!', routine)

    useEffect(() => {
    
    }, []);


    const submitUpdate = async (event) => {
        event.preventDefault();
        const submitRoutine = await updateRoutine(updateName, updateGoal, updateIsPublic);
        setUpdateName("");
        setUpdateGoal("");
        setUpdateIsPublic("");
    }

    const submitDelete = async (event) => {
        event.preventDefault();
        const submitRoutine = await deleteRoutine(editFields);

    }

    console.log('routine again?', routine )
    return(
        <>
            <div>
                <h1>Edit Routine:</h1>
                <input
                    placeholder="Routine Name"
                    value={updateName}
                    onChange={(event) => setUpdateName(event.target.value)}>
                </input>
                <input
                    placeholder="Goal"
                    value={updateGoal}
                    onChange={(event) => setUpdateGoal(event.target.value)}>
                </input>
                <div><p>isPublic?</p>
                <input               
                    type="checkbox"                
                    checked={updateIsPublic}                
                    onChange={(event) => setUpdateIsPublic(event.target.checked)}
                />
                </div>
                <button onClick={submitUpdate}>Update Routine</button>
            </div>
            <div>
                <h1>Delete Routine?</h1>
                <button onClick={submitDelete}>Delete Routine</button>
            </div>    


        </>
        
        )
    }



export default EditMyRoutines;