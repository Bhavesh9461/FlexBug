require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const { initSocket } = require("./src/config/socket.js");
const connectToDB = require("./src/config/database");

// Create HTTP server for Socket.IO
const server = http.createServer(app);

// Connect to MongoDB
connectToDB();

// Initialize Socket.IO
initSocket(server);

// Listen on server (not app)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});