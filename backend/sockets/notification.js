import { Server } from "socket.io";

export const initNotifications = (server) => {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("Client connected for notifications");
  });
};
