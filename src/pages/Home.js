import React from "react";
import PostForm from "./PostForm";
import Blogs from "./blogs/Blogs";
import { useSelector } from "react-redux";

const Home = () => {
  const status = useSelector((state) => state.auth.status);
  return (
    <div>
      {status && <PostForm />}
      <Blogs />
    </div>
  );
};

export default Home;
