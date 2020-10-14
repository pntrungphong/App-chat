import mongoose from "mongoose";
import express from "express";
import user from "./routers/user";
import file from "./routers/file";
import chatroom from "./routers/chatroom";
import { get } from "config";
import cors from "cors";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { Message } from "./models/message";
const app = express();

app.use(cors());

if (!get("jwtPrivateKey")) {
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/appchat")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api", user);
app.use("/api", chatroom);
app.use("/api", file);
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
const io = require("socket.io")(server);

io.use(async (socket: any, next: any) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, get("jwtPrivateKey")) as any;
    const { _id } = payload;
    socket.userId = _id;
    next();
  } catch (error) {
    console.log(error, "lol");
  }
});

io.on("connection", (socket: any) => {
  socket.on("joinRoom", (chatroomId: string) => {
    socket.room = chatroomId;
    console.log(socket.room, "socket 1");
    socket.join(socket.room);
  });
  socket.on("SEND_MESSAGE", async (data: any) => {
    const { message, chatroomId } = data;
    console.log(message);
    const newMessage = new Message({
      chatRoom: chatroomId,
      user: socket.userId,
      message,
    });
    console.log(socket.room,"socet 2")
    io.to(socket.room).emit("MESSAGE", data);
    await newMessage.save();
  });
  socket.on("disconnected", (chatroomId: string) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });
});
