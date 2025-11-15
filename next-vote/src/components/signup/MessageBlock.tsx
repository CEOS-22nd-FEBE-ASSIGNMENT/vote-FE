import React from "react";

interface CheckData {
  result: {
    available: boolean;
  };
}

interface MessageBlockProps {
  error?: string;
  checkError?: boolean;
  checkRequested?: boolean;
  checkData?: CheckData;
  isChecking?: boolean;
  availableMsg: string;
  unavailableMsg: string;
  needCheckMsg: string;
  minHeight?: string;
  className?: string;
  showWhenInput?: boolean;
  inputValue?: string;
}

const MessageBlock: React.FC<MessageBlockProps> = ({
  error,
  checkError,
  checkRequested,
  checkData,
  isChecking,
  availableMsg,
  unavailableMsg,
  needCheckMsg,
  minHeight = "20px",
  className = "mb-2",
  showWhenInput = false,
  inputValue,
}) => {
  if (showWhenInput && !inputValue) return <div style={{ minHeight }} className={className}></div>;
  return (
    <div style={{ minHeight }} className={className}>
      {error ? (
        <p className="text-red-500 text-body-2-semibold">{error}</p>
      ) : checkError ? (
        <p className="text-red-500 text-body-2-semibold">{needCheckMsg}</p>
      ) : checkRequested && !isChecking && checkData ? (
        <p className={`text-body-2-semibold ${checkData.result.available ? "text-blue-600" : "text-red-500"}`}>
          {checkData.result.available ? availableMsg : unavailableMsg}
        </p>
      ) : null}
    </div>
  );
};

export default MessageBlock;
