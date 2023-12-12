import React, { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  type?: string;
  text: string;
  onChannge?: (file: File) => void;
};

const Input: React.FC<InputProps> = ({
  children,
  className,
  type,
  text,
  onChange,
}) => {
  return (
    <div className={className}>
      <label
        className="ease cursor-pointer justify-center rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 px-10  py-3 text-center text-xl font-semibold text-white transition duration-300 hover:from-green-600 hover:to-cyan-600 md:w-auto md:py-4"
        htmlFor="resume-file"
      >
        {text}
        <input
          type="file"
          accept="application/pdf"
          id="resume-file"
          className="hidden"
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default Input;
