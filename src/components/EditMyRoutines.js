// import React, { useState, useEffect } from "react";
// import { createRoutine, updateRoutine } from "../api/api"; 


// // const EditMyRoutines = ({token}) => {
// //     const { newRoutine, setNewRoutine } = useState("");    
// //     const [ newGoal, setNewGoal ] = useState("");
// //     const [ newIsPublic, setNewIsPublic ] = useState(false)    
// //     const [ routine, setRoutine ] = useState([])

// const EditMyRoutines = ({ routine }) => {
//     const token = localStorage.getItem('Token')
//     const [updateIsPublic, setUpdateIsPublic] = useState(false)
//     const [updateName, setUpdateName] = useState("")
//     const [updateGoal, setUpdateGoal] = useState("")
 
//     const editFields = { token, routine }

//     useEffect(async() => {
//         const updatingRoutines = async () => {
//             const result = await updateRoutine(token);
//             setNewRoutine(result)
//         };
//         updatingRoutines();

//     }, [token]);



//     const submitUpdate = async (event) => {
//         event.preventDefault();
//         const submitRoutine = await updateRoutine(routine, updateName, updateGoal, updateIsPublic);
//         setUpdateName("");
//         setUpdateGoal("");
//         setUpdateIsPublic("")
//         submitRoutine;
//     }

//     // const submitDelete = async (event) => {
//     //     event.preventDefault();
//     //     const submitRoutine = await deleteRoutine(editFields);

//     // }

//     console.log('routine again?', routine )
//     return(
//         <>
//             <div>
//                 <h1>Edit Routine:</h1>
//                 <input
//                     placeholder={updateName}
//                     value={updateName}
//                     onChange={(event) => setUpdateName(event.target.value)}>
//                 </input>
//                 <input
//                     placeholder="Goal"
//                     value={updateGoal}
//                     onChange={(event) => setUpdateGoal(event.target.value)}>
//                 </input>
//                 <div><p>isPublic?</p>
//                 <input               
//                     type="checkbox"                
//                     checked={updateIsPublic}                
//                     onChange={(event) => setUpdateIsPublic(event.target.checked)}
//                 />
//                 </div>
//                 <button onClick={submitUpdate}>Update Routine</button>
//             </div>
//             {/* <div>
//                 <h1>Delete Routine?</h1>
//                 <button onClick={submitDelete}>Delete Routine</button>
//             </div>     */}


//         </>
        
//         )
// }



// export default EditMyRoutines;


import React, { useEffect, useState } from 'react';
import { createRoutine, updateRoutine } from "../api/api"; 


const EditMyRoutines = ({ routines }) => {
    const token = localStorage.getItem('token')

    const [editName, setEditName] = useState('');
    const [editGoal, setEditGoal] = useState('');
    const isPublic = true


    console.log('ID ID ID', routines.id)

    const id = routines.id

    const editFields = { id, editName, editGoal, isPublic }

    console.log('f*ck these fields', editFields )

    useEffect(() => {
        setEditName(routines.name);
        setEditGoal(routines.goal);
    }, []);
    
    return (
        <form className='edit-routine' onSubmit={(event) => updateRoutine(editFields)}>
            <h3>Edit Routine</h3>

            <label>Name:</label>
            <input type='text' placeholder='updated name' required
            value={editName} onChange={async (event) => setEditName(event.target.value)} />

            <label>Goal:</label>
            <input type='text' placeholder='updated goal' required
            value={editGoal} onChange={async (event) => setEditGoal(event.target.value)} />
            
            <label>Public:</label>
            <input type='checkbox' 
            defaultChecked={routines.isPublic} />
            
            <button type='submit'>Submit</button>
        </form> );
};

export default EditMyRoutines;