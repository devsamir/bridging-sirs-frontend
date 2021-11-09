import React from "react";
import { MdWarning } from "react-icons/md";
import Button from "./Button";

interface Props {
  errorTitle: string;
  errorText?: string;
  onClick?: any;
  loading?: any;
  buttonText?: string;
}

const ErrorBox: React.FC<Props> = ({
  errorTitle,
  errorText,
  loading,
  onClick,
  buttonText,
}) => {
  return (
    <div className="flex items-center mt-8 flex-col py-4 px-8 rounded-lg">
      <MdWarning className="text-8xl mt-4 mb-2 text-red-500" />
      <span className="text-lg text-center font-semibold text-red-500">
        {errorTitle}
      </span>
      <span className="text-sm text-center text-red-500">{errorText}</span>
      {onClick && (
        <div className="mt-2">
          <Button
            onClick={onClick}
            loading={loading}
            className="bg-red-500 text-gray-50 hover:bg-red-600"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorBox;
