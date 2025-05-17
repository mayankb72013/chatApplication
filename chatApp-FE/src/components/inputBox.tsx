import type { Ref } from "react";

export interface InputBoxProps{
    placeholder: string
    ref?: Ref<HTMLInputElement>;
}

export default function InputBox({placeholder,ref}: InputBoxProps){
    return(
        <>
          <input ref={ref} placeholder={placeholder} type="text" className="font-semibold text-zinc-500 w-75/100 px-4 py-3  border border-zinc-700 rounded-md"/>
        </>
    )
}