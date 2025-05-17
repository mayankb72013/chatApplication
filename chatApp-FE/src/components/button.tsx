export interface ButtonProps{
    text: string,
    size: "sm" | "md" | "lg"
    onClick?: ()=>void
}
const sizes = {
    "sm": "px-7 py-2 text-base",
    "md": "px-8 py-2 text-lg",
    "lg": "px-66 py-3 text-2xl"
}

export default function Button({text,size,onClick}: ButtonProps){
    return (
       <>
            <button onClick={onClick} className={`bg-zinc-100 text-zinc-950 ${sizes[size]} rounded font-mine font-semibold hover:outline-2 hover:outline-offset-2 hover:outline-zinc-300 active:bg-zinc-400 cursor-pointer`}>{text}</button>
       </>    
    )
}