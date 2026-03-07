// src/features/videoCall/services/socket.service.js
import { io } from "socket.io-client";

// Replace with your server URL (ngrok or localhost)
const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL || "http://localhost:3000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: true
});