import { Server } from "socket.io";

export const initStockUpdates = (server) => {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("Client connected for stock updates");
  });
};
