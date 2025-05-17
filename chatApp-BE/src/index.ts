import { WebSocketServer, WebSocket } from "ws";

interface RoomType {
    [roomid: string]: WebSocket[]
}

const wss = new WebSocketServer({ port: 8080 })

const rooms: RoomType = {};

wss.on("connection", (socket) => {


    socket.on("message", (message) => {
        const msg: { type: string, payload: { roomid: string, message: string } } = JSON.parse(message.toString());
        const type = msg.type;
        const roomid = msg.payload.roomid;
        const receivedMessage = msg.payload.message;

        if (type === "join") {
            if (!rooms[roomid]) {
                rooms[roomid] = [];
            }
            rooms[roomid].push(socket);
        }
        else if (type === "message") {
            if (receivedMessage != null || receivedMessage != "") {
                rooms[roomid].forEach((s) => (
                    s.send(receivedMessage)
                ))
            }
        } else if (type === "exit") {
            socket.send("closed");
            socket.close;
        }

    })
})