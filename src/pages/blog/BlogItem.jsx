import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Images from "../../components/header/Images";
import "./blogitems.css";

const BlogItem = () => {
  const { id } = useParams();
  const blogs = useSelector(
    ({ blogs }) => blogs.blogs?.filter((blog) => blog.$id === id)[0]
  );
  console.log(blogs);
  const { title, featuredImage, author, content, $createdAt } = blogs;

  // Format the date
  const formattedDate = new Date($createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-post">
      <h1 className="blog-post-title">{title}</h1>
      <Images className="blog-post-image" fileId={featuredImage} />
      <div className="blog-post-meta">
        <span className="blog-post-author">By {author}</span>
        <span className="blog-post-date">{formattedDate}</span>
      </div>
      <div className="blog-post-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BlogItem;
