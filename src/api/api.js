const BASE_URL = "http://localhost:3000/api";

export const fetchRegister = async (username, password) => {
    try {

        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            }),
        });

        const data = await response.json();

        return data;

    } catch(error) {
        console.error("Error registering new user", error)
    }
};

export const fetchLogin = async (username, password) => {
    try {
       
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            }),
        });

        const data = await response.json();

        return data
    } catch(error) {
        console.error("There was an error logging in", error);
    }
};

export const fetchGuest = async (token) => {
    try {

        const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json()

        return data;
    } catch(error) {
        console.error('Failed to fetch guest!', error);

    }
}

export const fetchActivities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        
        const data = await response.json()

        return data;
    } catch(error) {
        console.error("There was an error fetching activities", error)
    }
}

export const deleteActivity = async (token, routineActivityId) => {

    console.log('api delete activity', routineActivityId )
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        
        const data = await response.json()
        return data;
    } catch(error) {
        console.error("There was an error deleting activities", error)
    }
}

export const createActivities = async (name, description) => {
    try {
        const response = await fetch(`${BASE_URL}/activities`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, 
                description
            })
        })

        const data = await response.json();

        return data;
    } catch(error) {
        console.error("There was an error creating posts", error)
    }
}

export const getRoutines = async () => {
    const url = `${BASE_URL}/routines`;
    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }           
        })    
    const json = await response.json()    
    return json;
} catch (error){console.error(error, "Something's wrong with getting routines!")}
} 

export const createRoutine = async (token, name, goal, isPublic) => {    
    try {
        const response = await fetch(`${BASE_URL}/routines`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                goal,
                isPublic
            })
        });

        const result = await response.json();
        console.log("UMMUMM", result)
        return result;
    } catch(error) {
        console.error("There was an error creating routine", error)
    }
};

export const getUserRoutines = async(token, username) => {
    const url = `${BASE_URL}/users/${username}/routines`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }       
        });

        const result = await response.json();
        console.log("ARESULT", result)
        return result
    } catch (error) {
        console.error("Error getting user's routines")

    }
}

export const getSpecificUserRoutines = async(token, username) => {
    const url = `${BASE_URL}/users/${username}/routines`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }       
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error getting user's routines")

    }
}

export const deleteRoutine = async (token, routineId) => {

    const url = `${BASE_URL}/routine/${routineId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error deleting routine", error)

    }
}

export const updateRoutine = async (routineId, name, goal, isPublic ) => {
    const url = `${BASE_URL}/routines/${routineId}`;
    const token = localStorage.getItem('token')

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: `${name}`,
                goal: `${goal}`,
                isPublic: `${isPublic}`
            })
        })
        const result = await response.json()
        return result;
    } catch (error) {
        console.error("Error udpating routine", error)

    }   
}


export const deleteRoutineActivity = async (token, routineActivityId) => {
    try {
        const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();
        console.log("HOME STRETCH", result)
        return result;
    } catch(error) {
        console.error("There was an error deleting routine-activitiy", error)
    }
}




// be able to update the name and goal for the routine  X
// be able to delete the entire routine X
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
// be able to remove any activity from the routine
