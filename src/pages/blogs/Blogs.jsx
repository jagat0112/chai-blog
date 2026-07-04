import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";
import { Container } from "../../components";

const Blogs = () => {
  const { blogs } = useSelector(({ blogs }) => blogs);
  const [query, setQuery] = useState("");

  const published = blogs.filter((blog) => blog.status === "active");
  const visible = published.filter((blog) =>
    blog.title?.toLowerCase().includes(query.trim().toLowerCase())
  );

  if (published.length === 0) {
    return (
      <p className="empty-state">
        No posts yet — be the first to brew one up. ☕
      </p>
    );
  }

  return (
    <div>
      <div className="blog-search">
        <input
          type="search"
          className="blog-search-input"
          placeholder="Search posts by title…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {visible.length === 0 ? (
        <p className="empty-state">No posts match "{query}".</p>
      ) : (
        visible.map((blog) => (
          <Container className="container-half" key={blog.$id}>
            <BlogCard blog={blog} />
          </Container>
        ))
      )}
    </div>
  );
};

export default Blogs;
