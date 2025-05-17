import { useEffect } from "react";
import CopyIcon from "../icons/copy";

export default function RoomIdGenBox() {
    let roomCode = "";

    const sourceString = "012347896ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * (sourceString.length - 1))
        roomCode += sourceString[randomIndex];
    }

    return (
        <>
            <div className="rounded-md bg-zinc-800 w-full py-4 gap-2 flex justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                    <h3 className="text-neutral-400">Share this code with your friends</h3>
                    <h2 className="text-3xl">{roomCode}</h2>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(roomCode) }} className="absolute right-20 border-2 border-neutral-700 rounded-full p-2 cursor-pointer">
                    <CopyIcon></CopyIcon>
                </button>
            </div>

        </>
    )
}