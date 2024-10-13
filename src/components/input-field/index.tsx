import { cn } from "@/lib/utilities";
import { InputFieldProps } from "./types";
import { useRef, useState } from "react";

export default function InputField({
  value,
  placeholder,
  onChange,
//   validityCheck,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);


  const inputRef = useRef<HTMLInputElement>(null);

  const hanldleContainerClick = () => inputRef.current?.focus();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div
      onClick={hanldleContainerClick}
      className={cn(
        "cursor-text h-[60px] w-full flex items-center justify-center bg-white border rounded-sm relative"
      )}
    >
      <p
        className={cn(
          "absolute left-[10px] transition-all duration-300 m-0 text-[#a0a0a0] z-50",
          value !== "" || isFocused ? "top-[8px] text-xs" : "top-[15px] text-lg"
        )}
      >
        {placeholder}
      </p>
      {isFocused && (
        <div className="absolute rounded-sm inset-0 z-10 shadow-[inset_0_0_0_2px_black]" />
      )}
      <input
        className="w-full h-[30px] bg-transparent px-[10px] relative z-0 top-[8px]"
        type="text"
        ref={inputRef}
        value={value}
        onChange={handleInput}
        data-testid="input-field"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}
