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
                },
            }),
        });

        const data = await response.json();
        console.log("DATATA", response)
        return data;

    } catch(error) {
        console.error("Error registering new user", error)

        return {
            error: "Error registration failed",
            token: null,
            message: null
        }
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
                },
            }),
        });

        const data = await response.json();
        console.log("DATA", data)
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
        console.log("DAAAAATTTTAAAAA", data)
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
        console.log("DATA", data)
        return data;
    } catch(error) {
        console.error("There was an error fetching activities", error)
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
        console.log("THIS IS ", data)
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

export const createRoutine = async (name, goal, isPublic) => {    
    const url = `${BASE_URL}/routines`;
    const token = localStorage.getItem("token")
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: `${name}`,
            goal: `${goal}`,
            isPublic: `${isPublic}`,
        })
    });
    const result = await response.json();
    return result;
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
        console.log('hellloooooooo')
        const result = await response.json();
        return result
    } catch (error) {
        console.error("Error getting user's routines")

    }
}

export const deleteRoutine = async (token, routine) => {
    // const { routineId } = routine;
    console.log('API ROUTINE', routine)
    const url = `${BASE_URL}/routines/${routine}`;

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

export const updateRoutine = async (routineId, name, goal, isPublic) => {
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







// be able to update the name and goal for the routine  X
// be able to delete the entire routine X
// be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
// be able to update the duration or count of any activity on the routine
// be able to remove any activity from the routine
