export const BASEURL =
  "https://fitness-tracker-z419.onrender.com/api";

const makeHeaders = (token) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;

  }
  return headers;
};

const callAPI = async (endpointPath, defaultOptions = {}) => {
  const { token, method, body } = defaultOptions;
  const options = {
    headers: makeHeaders(token),
  };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASEURL}${endpointPath}`, options);
  const result = await response.json();

  return result;
};


export const getRoutines = async (token) => {

  try {
    const { success, error, data } = await callAPI("/routines", {
      token: token,
    });
    if (success) {
      return {
        error: null,
        routines: data.routines,
      };
    } else {
      return {
        error: error.message,
        routines: [],
      };
    }
  } catch (error) {
    console.error("There was an error fetching routines.", error);

    return {
      error: "Failed to load routines.",
      posts: [],
    };
  }
};

export const registerUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/register", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }


  } catch (error) {
    console.error("There was an error registering the user", error);

    return {
      error: "Registration Failed",
      token: null,
      message: null,
    };
  }
};

export const loginUser = async (username, password) => {
  try {
    const { success, error, data } = await callAPI("/users/login", {
      method: "POST",
      body: {
        user: {
          username,
          password,
        },
      },
    });

    if (success) {
      return {
        error: null,
        token: data.token,
        message: data.message,
      };
    } else {
      return {
        error: error.message,
        token: null,
        message: null,
      };
    }


  } catch (error) {
    console.error("There was an error logging in the user", error);

    return {
      error: "Log in Failed",
      token: null,
      message: null,
    };
  }
};

export const fetchGuest = async (token) => {
  try {
    const { success, error, data } = await callAPI("/users/me", {
      token: token,
    });

    if (success) {
      return {
        error: null,
        username: data.username,
      };
    } else {
      return {
        error: error.message,
        username: null,
      };
    }

  } catch (error) {
    console.error("Failed to fetch guest", error);
    return {
      error: "Failed to load user information",
      username: null,
    };
  }
};

export const createRoutine = async (
  token,
  isPublic,
  name,
  goal
) => {
  try {
    const routine = {
      isPublic,
      name,
      goal
    };

    const { success, error, data } = await callAPI("/posts", {
      token: token,
      method: "POST",
      body: {
        post: post,
      },
    });

    if (success) {
      return {
        error: null,
        routine: data.routine,
      };
    } else {
      return {
        error: error.message,
        routine: null,
      };
    }
  } catch (error) {
    console.error("POST /routines failed:", error);

    return {
      error: "Something went horribly wrong, failed to create the routine",
      post: null,
    };
  }
};

export const deleteRoutine = async (token, routineId) => {
  try {
    const { success, error } = await callAPI(`routine/${routineId}`, {
      method: "DELETE",
      token: token,
    });
    if (success) {
      return {
        error: null,
        data: null,
      };
    } else {
      return {
        error: error.mesage,
        data: null,
      };
    }
  } catch (error) {
    console.error("DELETE /routines/routineId failed", error);
    return {
      error: "Could not delete routine",
      data: null,
    };
  }
};
