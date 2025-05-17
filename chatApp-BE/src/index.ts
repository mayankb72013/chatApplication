import { WebSocketServer, WebSocket } from "ws";

interface RoomType {
    [roomid: string]: WebSocket[]
}

const wss = new WebSocketServer({ port: 8080 })

const rooms: RoomType = {};

wss.on("connection", (socket) => {


    socket.on("message", (message) => {
        const msg = JSON.parse(message.toString()) as { type: string, payload: { roomid: string, message: string } };
        const type = msg.type;
        const roomid = msg.payload.roomid;
        const receivedMessage = msg.payload.message;

        if (type === "join") {
            if (!rooms[roomid]) {
                rooms[roomid] = [];
            }
            rooms[roomid].push(socket);

            rooms[roomid].forEach(s => {
                if (s.readyState === WebSocket.OPEN) {
                    s.send(JSON.stringify({roomid:roomid,total: rooms[roomid].length.toString(),msg:""}))
                }
            })
            
        }
        else if (type === "message") {
            if (receivedMessage != null && receivedMessage.trim() !== "") {
                
                    
                    rooms[roomid].forEach(s => {
                        if (s !== socket && s.readyState === WebSocket.OPEN) {
                            s.send(JSON.stringify({ roomid, total: rooms[roomid].length.toString(), msg: receivedMessage }));
                        }
                    })
                
            }
        } else if (type === "exit") {
            rooms[roomid] = rooms[roomid].filter(s => s !== socket);
            socket.close();
            rooms[roomid].forEach(s => {
                // if (s.readyState === WebSocket.OPEN) {
                    s.send(JSON.stringify({roomid:roomid,total: rooms[roomid].length.toString(),msg:""}))
                // }
            })
        }
        
        
    })
    socket.on("close",() => {
        for(const roomid in rooms){
            rooms[roomid].forEach(s => {
                // if (s.readyState === WebSocket.OPEN) {
                    s.send(JSON.stringify({roomid:roomid,total: rooms[roomid].length.toString(),msg:""}))
                // }
            })
            rooms[roomid] = rooms[roomid].filter(s => s !== socket);
        }
    })
})