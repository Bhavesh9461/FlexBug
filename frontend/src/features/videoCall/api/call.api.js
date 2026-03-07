import axios from "axios";

export const createCall = (receiverId) => {
  return axios.post("/api/call/create", { receiverId });
};

export const updateCallStatus = (callId, status) => {
  return axios.put("/api/call/status", { callId, status });
};