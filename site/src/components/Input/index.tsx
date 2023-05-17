import { Dispatch, SetStateAction, useState } from "react";

interface IInput {
  buttonName: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}
export default function Input({ buttonName, placeholder, setValue }: IInput) {
  const [inputValue, setInputValue] = useState<string>();

  function handleChange(e: any) {
    setInputValue(e.target.value);
  }

  function handleClick() {
    setValue(inputValue);
  }

  return (
    <div>
      <input placeholder={placeholder} onChange={handleChange}></input>
      <button onClick={handleClick}>{buttonName}</button>
    </div>
  );
}
