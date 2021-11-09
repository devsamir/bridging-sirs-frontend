import React from "react";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: "text" | "password" | "email" | "file" | "date";
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  error?: string;
  touched?: boolean;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  name?: string;
  id?: string;
}

const color = "green";

const TextField: React.FC<Props> = ({
  value,
  onChange,
  label,
  onKeyPress,
  placeholder,
  type,
  fullWidth,
  error,
  touched,
  onBlur,
  name,
  id,
}) => {
  return (
    <div className={`flex my-2 flex-col ${fullWidth && "w-full"}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        className={`border ${
          error ? ` border-red-500` : " border-gray-400 border-opacity-70"
        }  px-4 py-2 focus:outline-none focus:ring-${color}-200 focus:ring-2 focus:border-${color}-400  rounded transition-colors `}
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        value={value}
        onBlur={onBlur}
      />
      {error && touched && (
        <span className="text-red-500 text-xs font-semibold">{error}</span>
      )}
    </div>
  );
};

export default TextField;
