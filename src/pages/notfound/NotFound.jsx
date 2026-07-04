import React from "react";
import { Link } from "react-router-dom";
import "./notfound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <span className="not-found-icon">🍃</span>
      <h1>Lost your leaves?</h1>
      <p>
        We couldn't find the page you're looking for. It may have been moved
        or never existed.
      </p>
      <Link className="custom-link" to="/">
        ← Back to the home page
      </Link>
    </div>
  );
};

export default NotFound;
