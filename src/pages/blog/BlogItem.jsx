import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Images from "../../components/header/Images";
import readingTime from "../../utils/readingTime";
import "./blogitems.css";

const BlogItem = () => {
  const { id } = useParams();
  const blog = useSelector(({ blogs }) =>
    blogs.blogs?.find((item) => item.$id === id)
  );

  if (!blog) {
    return (
      <div className="blog-post">
        <h1 className="blog-post-title">This post steeped away</h1>
        <p className="blog-post-content">
          We couldn't find that post — it may have been unpublished or the
          link is off. Check back on the{" "}
          <Link className="custom-link" to="/">
            home page
          </Link>{" "}
          for the latest brews.
        </p>
      </div>
    );
  }

  const { title, featuredImage, author, content, $createdAt } = blog;

  const formattedDate = new Date($createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-post">
      <Link className="custom-link blog-post-back" to="/">
        ← Back to all posts
      </Link>
      <h1 className="blog-post-title">{title}</h1>
      <Images className="blog-post-image" fileId={featuredImage} alt={title} />
      <div className="blog-post-meta">
        <span className="blog-post-author">By {author}</span>
        <span className="blog-post-date">
          {formattedDate} · {readingTime(content)}
        </span>
      </div>
      <div className="blog-post-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default BlogItem;
