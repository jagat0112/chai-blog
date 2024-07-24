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
      state.blog = action.payload;
    },
  },
});

export const { getPost, getPosts, addPost } = blogSlice.actions;
export default blogSlice.reducer;
