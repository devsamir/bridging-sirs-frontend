import React from "react";

interface Props {
  onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>;
  type?: "text" | "password" | "email" | "file" | "date";
  placeholder?: string;
  label?: string;
  fullWidth?: boolean;
  Form: any;
  name: string;
}

const color = "green";

const Field: React.FC<Props> = ({
  label,
  onKeyPress,
  placeholder,
  type,
  fullWidth,
  Form,
  name,
}) => {
  return (
    <div className={`flex my-2 flex-col ${fullWidth && "w-full"}`}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        className={`border ${
          Form.errors[name]
            ? ` border-red-400 focus:ring-red-200 focus:ring-2 focus:border-red-400`
            : " border-gray-400 border-opacity-70 focus:ring-${color}-200 focus:ring-2 focus:border-${color}-400"
        }  px-4 py-2 focus:outline-none rounded transition-colors `}
        onChange={Form.handleChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        value={Form.values[name]}
        onBlur={Form.handleBlur}
      />
      {Form.errors[name] && Form.touched[name] && (
        <span className="text-red-500 text-sm font-semibold mt-1">
          {Form.errors[name]}
        </span>
      )}
    </div>
  );
};

export default Field;
