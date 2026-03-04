import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

export async function register(fullname, username, email, password) {
  try {
    const res = await api.post("/api/auth/register", {
      fullname,
      username,
      email,
      password,
    });

    // Backend returns { message, userId }
    const { message, userId } = res.data;

    return { message, userId };
  } catch (err) {
    // err.response contains backend error message
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw err;
  }
}

export async function login(username, password) {
  try {
    const res = await api.post("/api/auth/login", {
      // email: email,
      username: username,
      password: password,
    });

    return res.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
}

export async function logout() {
  try {
    const res = await api.post("/api/auth/logout");

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function verifyOtp(tempEmail, code) {
  try {
    const res = await api.post("/api/auth/register/verify", {
      email: tempEmail, // from handleRegister
      code: code,
    });

    return res.data

  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAllUsers() {
  try {
    const res = await api.get("/api/auth/all-users");
    // console.log(res.data);
    
    return res.data

  } catch (err) {
    console.error(err);
    throw err;
  }
}
