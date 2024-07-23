import React from "react";
import LogoutBtn from "./logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarItems = () => {
  const navigate = useNavigate();
  const { status, userData } = useSelector(({ auth }) => auth);

  const navItems = [
    { name: "Home", to: "/", active: status },
    { name: "Notifications", to: "/", active: status },
    { name: "Messages", to: "/", active: status },
    { name: "Profile", to: `/profile/${userData?.$id}`, active: status },
    { name: "Login", to: "/login", active: !status },
    { name: "Register", to: "/register", active: !status },
  ];

  return (
    <>
      {navItems.map(
        (item) =>
          item.active && (
            <li className="nav-item" key={item.name}>
              <button
                onClick={() => {
                  navigate(item.to);
                }}
              >
                {item.name}
              </button>
            </li>
          )
      )}
      {status && (
        <li className="nav-item">
          <LogoutBtn></LogoutBtn>
        </li>
      )}
    </>
  );
};

export default NavbarItems;
