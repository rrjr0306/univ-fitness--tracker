const BASE_URL = "https://fitness-tracker-z419.onrender.com/api";

const makeHeaders = (token) => {
    const headers = {
        "Content-Type": "application/json",
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`
    }

    return headers;
};

const callAPI = async (path, givenOptions = {}) => {
    const {token, method, body} = givenOptions;

    const options = {
        headers: makeHeaders(token)
    }

    if (method) {
        options.method = givenOptions.method;
    }

    if (body) {
        options.body = JSON.stringify(givenOptions.body);
    }

    const response = await fetch(`${BASE_URL}${path}`, options);
    const result = await response.json();

    return result;
}

export const fetchRegister = async (username, password) => {
    try {

        const {success, error, data} = await callAPI(`/users/register`, {
            method: "POST",
            body: {
                user: {
                    username,
                    password
                },
            }
        })

        if (success) {
            return {
                error: null,
                token: data.token,
                message: data.message
            }
        } else {
            return {
                error: error.message,
                token: null,
                message: null
            }
        }

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
       
        const {success, error, data} = await callAPI(`/users/login`, {
            method: "POST",
            body: {
                user: {
                    username,
                    password
                }
            }
        })

        if (success) {
            return {
                error: null,
                token: data.token,
                message: data.message
            }
        } else {
            return {
                error: error.message,
                token: null,
                message: null
            }
        }
    } catch(error) {
        console.error("There was an error logging in", error);
    }
};