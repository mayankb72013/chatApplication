import { useState } from 'react';
import './App.css'
import Button from './components/button';
import InputBox from './components/inputBox';
import RoomIdGenBox from './components/roomIdGenBox';
import ChatIcon from './icons/chat';
import RoomInfoBox from './components/roomInfo';


function App() {

  const [showRoomCode, setShowRoomCode] = useState(false);
  const [showChatRoom, setShowChatRoom] = useState(false);

  function joinRoom() {

  }

  return (
    <div className='bg-black h-screen flex justify-center items-center text-zinc-100 font-mine'>
      <div className='border-2 rounded-md border-zinc-800 w-45/100 -translate-y-10'>
        <div className='px-4 py-6'>
          <div>
            <div className='flex items-center gap-2'>
              <ChatIcon></ChatIcon>
              <h1 className='text-3xl font-semibold'>Real Time Chat</h1>
            </div>
            <h4 className='text-neutral-400'>temporary room that expires after all users exit</h4>
          </div>

          {!showChatRoom && <div>
            <div className='py-6 justify-self-center'>
              <Button onClick={() => (setShowRoomCode(true))} text='Create New Room' size='lg'></Button>
            </div>

            <div className='flex gap-3 justify-center'>
              <InputBox width='76' placeholder='Enter Room Code'></InputBox>
              <Button onClick={joinRoom} text='Join Room' size='md'></Button>
            </div>
          </div>}

          {showChatRoom && <div className='mt-7 '>
              <RoomInfoBox roomid='E4NIQS' totalUsers='10'></RoomInfoBox>
              <div className='border-2 rounded-md border-zinc-800 my-3 h-120 '>

              </div>
            <div className='flex gap-3 justify-center'>
              <InputBox width='90' placeholder='Type a message...'></InputBox>
              <Button onClick={joinRoom} text='Send' size='sm'></Button>
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