import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {createActivities} from "../api/api";

const CreateActivity = ({setActivities}) => {
    
    const history = useHistory();
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");

    return (
        <div>
            <form onSubmit={async (event) => {
                event.preventDefault();

                const result = await createActivities(name, description)

                
                setActivities((prevActivities) => [...prevActivities, result]);
                setName("");
                setDescription("");
                history.push("/Activities")
                
            }}>
                <h4>Create your own Activity</h4>
                <div>
                    <label htmlFor="name">Name of Activity</label>
                    <input 
                        onChange={(event) => {setName(event.target.value)}}
                        value={name}
                        type="text"
                        placeholder="Name your Activity!"
                        required
                    ></input>
                </div>

                <div>
                    <label htmlFor="description">In a few words, walk us through your Activity</label>
                    <input
                        onChange={(event) => {setDescription(event.target.value)}} 
                        value={description}
                        type="text"
                        placeholder="Description"
                        required
                    ></input>
                </div>

                <button type="submit">Create Activity</button>
            </form>
        </div>
    )
}

export default CreateActivity