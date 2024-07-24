import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import Blogs from "./blogs/Blogs";
import { useSelector } from "react-redux";
import { SkeletonLoader } from "../components";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const status = useSelector((state) => state.auth.status);
  return (
    <>
      {loading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        <>
          {status ? (
            <PostForm />
          ) : (
            <h3 className="prompt-message">
              Please Log in or Register to start posting.
            </h3>
          )}{" "}
          <Blogs />
        </>
      )}
    </>
  );
};

export default Home;
