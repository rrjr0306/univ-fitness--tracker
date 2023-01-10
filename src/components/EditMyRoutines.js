import React, { useEffect, useState } from 'react';
import { updateRoutine } from "../api/api"; 


const EditMyRoutines = ({ routines }) => {

    const [editName, setEditName] = useState('');
    const [editGoal, setEditGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false)

    const id = routines.id

    const editFields = { id, editName, editGoal, isPublic }

    useEffect(() => {
        setEditName(routines.name);
        setEditGoal(routines.goal);
    }, []);
    
    return (
        <form className='edit-routine' onSubmit={updateRoutine(editFields)}>
            <h3>Edit Routine</h3>

            <label>Name:</label>
            <input type='text' placeholder='updated name' required
            value={editName} onChange={async (event) => setEditName(event.target.value)} />

            <label>Goal:</label>
            <input type='text' placeholder='updated goal' required
            value={editGoal} onChange={async (event) => setEditGoal(event.target.value)} />
            
            <label>Public:</label>
            <input type='checkbox' value={isPublic} onChange={(event) => {setIsPublic(event.target.value)}} />
            
            <button type='submit'>Submit</button>
        </form> );
};

export default EditMyRoutines;