import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Button, Input, Errors, Container } from "../components";
import enhancedSlugify from "../utils/enhancedSlugify";
import service from "../appwrite/config";
import "./css/PostForm.css";

const PostForm = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const errorMessage = errors[Object.keys(errors)[0]];
  let userId = useSelector((state) => state);
  const author = userId.auth.userData.name;
  const firstNameAuthor = author.split(" ")[0];

  const submit = async ({ featuredImage, title, content, status }) => {
    const slug = enhancedSlugify(title, { lower: true });

    status = status ? "active" : "inactive";
    const image = Object.values(featuredImage)[0];

    if (image) {
      const { $id } = await service.uploadFile(image);
      featuredImage = $id;
    } else {
      featuredImage = null;
    }
    userId = userId.auth.userData?.$id;
    const res = service.createPost({
      userId,
      content,
      title,
      slug,
      status,
      featuredImage,
      author,
    });
    if (res) {
      reset();
    }
  };

  return (
    <Container className="container-half post-form-container">
      <h2>Hi {firstNameAuthor}, what's happening?</h2>
      <form onSubmit={handleSubmit(submit)}>
        {errorMessage ? <Errors>{errorMessage?.message}</Errors> : null}
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
        <Button type="submit" bgColor="blue">
          Post
        </Button>
      </form>
    </Container>
  );
};

export default PostForm;
