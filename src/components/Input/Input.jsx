import React, { useState } from "react";
import { useController } from "react-hook-form";
export default function Input(props) {
  const { field } = useController(props);
  const [value, setValue] = useState("");
  return (
    <input
      className={` border outline-none sm:text-sm rounded-lg  block w-full p-2.5  border-gray-300 placeholder-gray-400 ${
        props.disabled
          ? "bg-gray-400"
          : props.projectField
          ? " bg-white text-black"
          : "text-white bg-gray-700"
      }`}
      {...field}
      disabled={props.disabled}
      placeholder={field.name}
      autoComplete="off"
      onChange={(e) => {
        setValue(e.target.value);
        field.onChange && field.onChange(e);
        props.onChange && props.onChange(e);
      }}
      value={field.value || value}
      type={
        props.name === "password"
          ? "password"
          : props.numberInput
          ? "number"
          : "text"
      }
    />
  );
}
