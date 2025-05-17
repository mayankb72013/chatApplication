"use strict";
// import { WebSocketServer } from 'ws';
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        socket.send("hi there");
    });
});
