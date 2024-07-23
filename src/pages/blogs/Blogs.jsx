import React from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { Container } from "../../components";

const Blogs = () => {
  const { blogs } = useSelector(({ blogs }) => blogs);

  return (
    <div>
      {blogs.map((blog) => (
        <Container className="container-half" key={blog.$id}>
          <BlogCard blog={blog} />
        </Container>
      ))}
    </div>
  );
};

export default Blogs;
