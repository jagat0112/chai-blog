import React, { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, className = "", type = "text", ...props }, ref) => {
    const id = useId();
    return (
      <div>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          className={`basic-input ${className}`}
          type={type}
          id={id}
          ref={ref}
          {...props}
        ></input>
      </div>
    );
  }
);

export default Input;
