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

        const data = response.json();
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

        const data = response.json()
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

export const createRoutine = async (name, goal, isPublic, token) => {    
    const url = `${BASE_URL}/routines`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            goal,
            isPublic,
        })
    });
    const result = await response.json();
    return result;
};

export const getUserRoutines = async() => {
    // const username = localStorage.getItem('username');
    const url = `${BASE_URL}/MyRoutines`
    const token = localStorage.getItem('token')

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
        console.error("Error getting user's routines", error)

    }
}