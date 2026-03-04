import axios from "axios";

const api = axios.create({
  withCredentials: true,
});

export async function getMe() {
  try {
    const res = await api.get("/api/auth/get-me");
    // console.log(res);

    return res.data;
  } catch (err) {
    throw err;
  }
}

export async function updateUser(username, bio, image) {
  try {
    const formData = new FormData();
    if (username) formData.append("username", username);
    formData.append("bio",bio)
    if (image) formData.append("profileImage", image);

    const res = await api.patch("/api/auth/update-user", formData);

    return res.data;
  } catch (err) {
    throw err;
  }
}
