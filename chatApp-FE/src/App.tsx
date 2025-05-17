import { useEffect, useRef, useState } from 'react';
import './App.css'
import Button from './components/button';
import InputBox from './components/inputBox';
import RoomIdGenBox from './components/roomIdGenBox';
import ChatIcon from './icons/chat';
import RoomInfoBox from './components/roomInfo';
import TextBox from './components/text';


function App() {

  const [showRoomCode, setShowRoomCode] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);

  const [messages, setMessages] = useState<{ type: "sent"|"got", msg: string }[]>([]);
  const [roomid, setRoomId] = useState("");
  const [totalUsers, setTotalUsers] = useState("");

  const currentMessage = useRef<HTMLInputElement>(null);
  const currentRoomId = useRef<HTMLInputElement>(null);

  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (e) => {
      const response = e.data;
      const json = JSON.parse(response);
      setRoomId(json.roomid);
      setTotalUsers(json.total);
      if (json.msg != "") {
        setMessages(m => [...m, { type: "got", msg: json.msg }])
      }
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  function joinRoom() {
    if (currentRoomId.current?.value !== null && currentRoomId.current?.value !== undefined && currentRoomId.current?.value.trim() !== "") {
      setRoomId(currentRoomId.current!.value);
      ws.current?.send(JSON.stringify({ type: "join", payload: { roomid: currentRoomId.current!.value, message: "" } }))
      setShowChatRoom(true);
      setShowRoomCode(false);
    }
  }

  function sendMessage() {
    if (currentMessage.current != null) {
      setMessages(m => [...m, { type: "sent", msg: currentMessage.current!.value }])
      ws.current?.send(JSON.stringify({ type: "message", payload: { roomid: roomid, message: currentMessage.current?.value } }))
    }
  }

  return (
    <div className='bg-black h-screen flex justify-center items-center text-zinc-100 font-mine'>
      <div className='border-2 rounded-md border-zinc-800 w-45/100 -translate-y-10'>
        <div className='px-5 py-7'>
          <div className='px-4'>
            <div className='flex items-center gap-2'>
              <ChatIcon></ChatIcon>
              <h1 className='text-4xl font-semibold'>Real Time Chat</h1>
            </div>
            <h4 className='text-neutral-400 text-lg'>temporary room that expires after all users exit</h4>
          </div>

          {!showChatRoom && <div>
            <div className='py-6 justify-self-center'>
              <Button onClick={() => (setShowRoomCode(true))} text='Create New Room' size='lg'></Button>
            </div>

            <div className='flex gap-3 justify-center w-full'>
              <InputBox ref={currentRoomId} width='76' placeholder='Enter Room Code'></InputBox>
              <Button onClick={joinRoom} text='Join Room' size='md'></Button>
            </div>
          </div>}

          {showChatRoom && <div className='mt-7 '>
            <RoomInfoBox roomid={roomid} totalUsers={totalUsers}></RoomInfoBox>
            <div className='border-2 rounded-md border-zinc-800 my-3 h-120 '>
                {messages.map(message=>(
                  <TextBox type={message.type} text={message.msg}></TextBox>
                ))}
            </div>
            <div className='flex gap-3 justify-center w-full'>
              <InputBox ref={currentMessage} width='90' placeholder='Type a message...'></InputBox>
              <Button onClick={sendMessage} text='Send' size='sm'></Button>
            </div>

          </div>}



          {showRoomCode && <div className='flex items-center w-full mt-4'>
            <RoomIdGenBox></RoomIdGenBox>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default App;