import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ManagePosts.css";
import service from "../../appwrite/config";

const ManagePosts = () => {
  const { id } = useParams();

  const myBlogs = useSelector(({ blogs }) => blogs.blogs).filter(
    (item) => item.userId === id
  );

  const handleDelete = (postId) => {
    try {
      service.deletePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (postId) => {};

  return (
    <div className="manage-posts">
      <h2>Manage Posts</h2>
      <ul className="post-list">
        {myBlogs.map((post) => (
          <li key={post.id} className="post-item">
            <div className="post-title">{post.title}</div>
            <div className="post-status">
              {post.status === "active" ? "Published" : "Not Published"}
            </div>
            <div className="post-actions">
              <button
                onClick={() => handleUpdate(post.$id)}
                className="update-button"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(post.$id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePosts;
