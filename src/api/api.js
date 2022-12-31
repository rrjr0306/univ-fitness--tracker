const BASE_URL = "http://localhost:3000/api";

// const makeHeaders = (token) => {
//     const headers = {
//         "Content-Type": "application/json",
//     }

//     if (token) {
//         headers["Authorization"] = `Bearer ${token}`
//     }

//     return headers;
// };

// const callAPI = async (path, givenOptions = {}) => {
//     const {token, method, body} = givenOptions;

//     const options = {
//         headers: makeHeaders(token)
//     }

//     if (method) {
//         options.method = givenOptions.method;
//     }

//     if (body) {
//         options.body = JSON.stringify(givenOptions.body);
//     }

//     const response = await fetch(`${BASE_URL}${path}`, options);
//     const result = await response.json();

//     return result;
// }

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
