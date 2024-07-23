import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Input, Button, Errors } from "../components/index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as loginUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit, formState } = useForm();
  const dispatch = useDispatch();
  const { errors } = formState;
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await authService.login(data);
      if (response) {
        const user = await authService.getCurrentUser();
        dispatch(loginUser(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="login-container" onSubmit={handleSubmit(login)}>
      <h2>Login</h2>
      <div>
        {errors.email && <Errors>{errors.email?.message}</Errors>}
        {error && <Errors>{error}</Errors>}
        <Input
          placeholder="Email"
          {...register("email", {
            required: { value: true, message: "Email is required" },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email address",
            },
          })}
        />
      </div>
      <div>
        {errors.password && <Errors>{errors.password?.message}</Errors>}
        <Input
          placeholder="Password"
          type="password"
          {...register("password", {
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])/,
              message:
                "Password must include uppercase, lowercase, number, and special character",
            },
          })}
        />
      </div>
      <Button bgColor="yellow" type="submit">
        Login
      </Button>
      <p>
        New User?{" "}
        <Link className="custom-link" to="/register">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
