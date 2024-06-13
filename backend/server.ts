import express from "express";

const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

//routes
app.get("/", (req, res) => {
    res.send("This is a real-time collaborative board-sharing app");
});

// io.on("connection", (socket) => {
//     console.log("user connected");
// })

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("server listening on localhost: 5000"));