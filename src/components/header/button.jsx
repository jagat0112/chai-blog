import React from "react";

const Button = ({
  children,
  type = "button",
  bgColor = "blue",
  textColor = "white",
  className = "",
  ...props
}) => {
  return (
    <button
      className={` button ${className} button-${bgColor} ${textColor} `}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
