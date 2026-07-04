import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./ManagePosts.css";
import service from "../../appwrite/config";
import { removePost } from "../../store/blogSlice";
import PostForm from "../PostForm";

const ManagePosts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const myBlogs = useSelector(({ blogs }) => blogs.blogs).filter(
    (item) => item.userId === id
  );

  const handleDelete = async (postId) => {
    setError("");
    setDeletingId(postId);
    try {
      await service.deletePost(postId);
      dispatch(removePost(postId));
      if (editingId === postId) setEditingId(null);
    } catch (err) {
      setError("Couldn't delete that post. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="manage-posts">
      <h2>Manage Posts</h2>
      {error && <p className="error-message">{error}</p>}
      {myBlogs.length === 0 ? (
        <p className="empty-state">
          You haven't published anything yet. Head to the home page to write
          your first post.
        </p>
      ) : (
        <ul className="post-list">
          {myBlogs.map((post) => (
            <React.Fragment key={post.$id}>
              <li className="post-item">
                <div className="post-title">{post.title}</div>
                <div className="post-status">
                  {post.status === "active" ? "Published" : "Not Published"}
                </div>
                <div className="post-actions">
                  <button
                    onClick={() =>
                      setEditingId(editingId === post.$id ? null : post.$id)
                    }
                    className="update-button"
                  >
                    {editingId === post.$id ? "Close" : "Update"}
                  </button>
                  <button
                    onClick={() => handleDelete(post.$id)}
                    className="delete-button"
                    disabled={deletingId === post.$id}
                  >
                    {deletingId === post.$id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </li>
              {editingId === post.$id && (
                <li className="post-edit-row">
                  <PostForm
                    existingPost={post}
                    onDone={() => setEditingId(null)}
                  />
                </li>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagePosts;
