import { forwardRef } from "react";

export interface InputBoxProps {
  placeholder: string;
  width: string; // e.g., "70", "76"
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  ({ placeholder, width }, ref) => {
    const widthMap: Record<string, string> = {
      "70": "w-[70%]",
      "76": "w-[76%]",
      "80": "w-[80%]",
      "90": "w-[90%]",
    };

    const w = widthMap[width] || "w-[70%]";

    return (
      <input
        ref={ref}
        placeholder={placeholder}
        type="text"
        className={`font-semibold text-zinc-500 ${w} px-4 py-3 border border-zinc-700 rounded-md`}
      />
    );
  }
);

export default InputBox;
