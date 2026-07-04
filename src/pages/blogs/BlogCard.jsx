import React from "react";
import { Link } from "react-router-dom";
import Images from "../../components/header/Images";
import readingTime from "../../utils/readingTime";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <div className="blog-card-header">
        <Images
          alt={blog.title}
          className="blog-card-image"
          fileId={blog.featuredImage}
        />
      </div>
      <div className="blog-card-body">
        <Link className="blog-link" to={`/blog/${blog.$id}`}>
          <h2 className="blog-card-title">{blog.title}</h2>
        </Link>
        <p className="blog-card-content">{blog.content}</p>
        <div className="blog-card-footer">
          <span className="blog-card-status">Author: {blog.author}</span>
          <p className="blog-card-date">
            {new Date(blog.$createdAt).toLocaleDateString()} ·{" "}
            {readingTime(blog.content)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
