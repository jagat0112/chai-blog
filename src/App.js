import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { getPosts } from "./store/blogSlice";
import service from "./appwrite/config";
import authService from "./appwrite/auth";
import "./App.css";
import {
  LoginPage,
  RegisterPage,
  Navbar,
  User as Profile,
  BlogItem,
  ManagePosts,
  Home,
} from "./pages/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      authService.getCurrentUser().then((userData) => {
        userData ? dispatch(login(userData)) : dispatch(logout());
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      service.getDocuments().then(({ documents }) => {
        dispatch(getPosts(documents));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route Component={LoginPage} path="/login" />
        <Route Component={RegisterPage} path="/register" />
        <Route Component={Home} path="/" />
        <Route Component={BlogItem} path="/blog/:id" />
        <Route Component={Profile} path="/profile/:id" />
        <Route Component={ManagePosts} path="/manage/posts/:id" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
