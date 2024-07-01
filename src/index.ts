import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes/index";
import deserializeToken from "./middleware/deserializeToken";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

// Connect to db
import "./utils/connectDB";

const app = express();
const port: number = 3000;
const host: string = "0.0.0.0"; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up CORS middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:51264"],
    credentials: true,
  })
);

app.use(deserializeToken);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  },
});

io.on("connection", (socket: any) => {
  console.log("Socket connected: " + socket.id);
  socket.on("send_message", (data: any) => {
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("delete_message", (chatId: any) => {
    socket.broadcast.emit("message_deleted", chatId);
  });
});

routes(app);

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
