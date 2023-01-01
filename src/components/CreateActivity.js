import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//  import { createActivity } from "../api/api";

const ActivityCreateForm = ({token, setActivity}) => {
    const history = useHistory();
    const [name, setName] = useState('');
     const [description, setDescripton] = useState('');
     
    const [errorMessage, setErrorMessage] = useState(null);


return (<form className="ui form" onSubmit={async (event)=> {
    event.preventDefault();
    

    const {error, activity} = await createActivity(token, name, description);

    if (activity) {
        setActivity((prevActivities) => [...prevActivities, activity])
        setName('');
        setDescripton('');
        history.push('/activities');
    } else {
        setErrorMessage(error);
    }
    
    
}}>
<h3>Create A New Activity!</h3>

<div className="field">
<label htmlFor="title">Name</label>
<input type="text" placeholder="The Name of Activity" required autoComplete="off"
value={name}
onChange={(event) =>setTitle(event.target.value)}></input>
</div>

<div className="field">
<label htmlFor="description">Description</label>
<input type="text" placeholder="A Description of Activity" required autoComplete="off"
value={description}
onChange={(event) => setDescripton(event.target.value)}></input>
</div>
    
<button type="submit" className="ui button">Create</button>
</form>)
};

 export default ActivityCreateForm;