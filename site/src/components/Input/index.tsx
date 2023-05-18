import { useState } from "react";

interface IInput {
  buttonName: string;
  placeholder: string;
  setValue: (value: string) => void;
}
export default function Input({ buttonName, placeholder, setValue }: IInput) {
  const [inputValue, setInputValue] = useState<string>("");

  function handleChange(e: any) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    setValue(inputValue!);
    setInputValue("");
  }

  function handleKeyPress(event: any) {
    if (event.key === "Enter") {
      setValue(inputValue!);
      setInputValue("");
    }
  }

  return (
    <div className="input-wrapper">
      <input
        placeholder={placeholder}
        onChange={handleChange}
        value={inputValue}
        onKeyDown={handleKeyPress}
      ></input>
      <button onClick={handleClick} className="input-button">
        {buttonName}
      </button>
    </div>
  );
}
