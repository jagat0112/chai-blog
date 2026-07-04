import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Errors, Container } from "../components";
import enhancedSlugify from "../utils/enhancedSlugify";
import service from "../appwrite/config";
import { addPost, editPost } from "../store/blogSlice";
import "./css/PostForm.css";

const PostForm = ({ existingPost = null, onDone }) => {
  const isEditMode = Boolean(existingPost);
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditMode
      ? {
          title: existingPost.title,
          content: existingPost.content,
          status: existingPost.status === "active",
        }
      : {},
  });
  const { errors } = formState;
  const errorMessage = errors[Object.keys(errors)[0]];
  const dispatch = useDispatch();
  const userState = useSelector((state) => state);
  const author = userState.auth.userData.name;
  const firstNameAuthor = author.split(" ")[0];
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async ({ featuredImage, title, content, status }) => {
    setSubmitError("");
    setSuccess("");
    setSubmitting(true);
    status = status ? "active" : "inactive";
    const chosenFile = Object.values(featuredImage || {})[0];

    try {
      let uploadedFeaturedImage = isEditMode
        ? existingPost.featuredImage
        : null;

      if (chosenFile) {
        const uploaded = await service.uploadFile(chosenFile);
        if (uploaded) uploadedFeaturedImage = uploaded.$id;
      }

      if (isEditMode) {
        const updated = await service.updatePost(existingPost.$id, {
          title,
          content,
          status,
          featuredImage: uploadedFeaturedImage,
          userId: existingPost.userId,
        });
        dispatch(
          editPost(
            updated ?? {
              ...existingPost,
              title,
              content,
              status,
              featuredImage: uploadedFeaturedImage,
            }
          )
        );
        setSuccess("Changes saved.");
        onDone?.();
      } else {
        const slug = enhancedSlugify(title, { lower: true });
        const created = await service.createPost({
          userId: userState.auth.userData?.$id,
          content,
          title,
          slug,
          status,
          featuredImage: uploadedFeaturedImage,
          author,
        });
        if (created) {
          dispatch(addPost(created));
          reset();
          setSuccess("Post published! It's now live in the feed.");
        }
      }
    } catch (error) {
      setSubmitError(
        isEditMode
          ? "Couldn't save your changes. Please try again."
          : "Couldn't publish your post. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="container-half post-form-container">
      <h2>
        {isEditMode ? "Edit your post" : `Hi ${firstNameAuthor}, what's happening?`}
      </h2>
      <form onSubmit={handleSubmit(submit)}>
        {errorMessage ? <Errors>{errorMessage?.message}</Errors> : null}
        {submitError ? <Errors>{submitError}</Errors> : null}
        {success ? <p className="form-success">{success}</p> : null}
        <Input
          type="text"
          className="title-input"
          placeholder="Enter your post title"
          {...register("title", {
            required: { value: true, message: "Title is required" },
          })}
        />
        <textarea
          placeholder="What's happening?"
          className="post-input"
          {...register("content", {
            required: { value: true, message: "Content is required" },
            minLength: { value: 10, message: "Minimum of 150 is required" },
          })}
        />
        <Input
          type="file"
          className="file-input"
          accept=".jpg,.png,.webp,.jpeg"
          {...register("featuredImage")}
        />
        <div className="publish-checkbox">
          <Input type="checkbox" {...register("status")} />
          <label>Publish</label>
        </div>
        <Button type="submit" bgColor="blue" disabled={submitting}>
          {submitting ? "Saving…" : isEditMode ? "Save changes" : "Post"}
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;
