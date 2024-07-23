import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const response = await authService.logout();
      console.log(response);
      navigate("/login");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={handleLogOut}>Logout</button>;
};

export default LogoutBtn;
