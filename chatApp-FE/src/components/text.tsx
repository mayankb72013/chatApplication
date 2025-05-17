export interface TextBoxProps {
    type: "sent" | "got",
    text: string
}

const colors = {
    "sent" : "text-zinc-950 bg-zinc-100 justify-self-end mx-2 my-1 px-3 rounded-md",
    "got": "text-zinc-100 bg-zinc-800 justify-self-start mx-2 my-1 px-3 rounded-md"
}
export default function TextBox({type,text}: TextBoxProps){
    return (
       <>
            <div className={`flex p-2 ${colors[type]}`}>{text}</div>
       </>
    )
}