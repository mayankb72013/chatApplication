import type { Ref } from "react";

export interface InputBoxProps{
    placeholder: string
    ref?: Ref<HTMLInputElement>;
    width: string
}

export default function InputBox({placeholder,ref,width}: InputBoxProps){
    return(
        <>
          <input ref={ref} placeholder={placeholder} type="text" className={`font-semibold text-zinc-500 w-${width}/100 px-4 py-3  border border-zinc-700 rounded-md`}/>
        </>
    )
}