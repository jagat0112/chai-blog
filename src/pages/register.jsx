import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Input, Button, Errors } from "../components/index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login as loginUser } from "../store/authSlice";

const Register = () => {
  const { register, handleSubmit, formState } = useForm();
  const [error, setError] = useState("");
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (data) => {
    try {
      const registered = await authService.createAccount(data);
      let loggedin;
      if (registered) {
        loggedin = await authService.login(data);
      }

      if (loggedin) {
        const userData = await authService.getCurrentUser();
        dispatch(loginUser(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form className="login-container" onSubmit={handleSubmit(signup)}>
      <h2>Register</h2>
      <div>
        {error && <Errors>{error}</Errors>}

        {errors.name && <Errors>{errors.name?.message}</Errors>}
        <Input
          placeholder="Full Name"
          {...register("name", {
            required: { value: true, message: "Full Name is required" },
            maxLength: 20,
          })}
        />
      </div>
      <div>
        {errors.email && <Errors>{errors.email?.message}</Errors>}
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
      <Button type="submit" bgColor="yellow">
        Register
      </Button>
      <p>
        Already a User?{" "}
        <Link className="custom-link" to="/login">
          Login
        </Link>
      </p>
    </form>
  );
};
export default Register;
