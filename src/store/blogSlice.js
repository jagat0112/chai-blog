import { createSlice } from "@reduxjs/toolkit";

const initialState = { blogs: [], blog: {} };

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      action.payload.map((item) => state.blogs.unshift(item));
    },
    getPost: (state, action) => {
      state.blog = action.payload;
    },
    addPost: (state, action) => {
      state.blogs.unshift(action.payload);
    },
    removePost: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.$id !== action.payload);
    },
    editPost: (state, action) => {
      const index = state.blogs.findIndex(
        (blog) => blog.$id === action.payload.$id
      );
      if (index !== -1) state.blogs[index] = action.payload;
    },
  },
});

export const { getPost, getPosts, addPost, removePost, editPost } =
  blogSlice.actions;
export default blogSlice.reducer;
