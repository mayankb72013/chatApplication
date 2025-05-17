export interface RoomInfoProps{
    roomid: string,
    totalUsers: string
}

export default function RoomInfoBox({roomid,totalUsers}: RoomInfoProps){
    return (
        <>
            <div className="bg-zinc-800 flex justify-between px-4 py-3 rounded-md text-lg text-neutral-400">
                <div>Room Code: {roomid}</div>
                <div>Users: {totalUsers}</div>
            </div>
        </>
    )
}