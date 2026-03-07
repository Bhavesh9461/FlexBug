import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });

    // call user
    socket.on("callUser", ({ to, from, signal }) => {
      io.to(to).emit("incomingCall", {
        from,
        signal,
      });
    });

    // answer call
    socket.on("answerCall", ({ to, signal }) => {
      io.to(to).emit("callAccepted", signal);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};

export const getIO = () => io;