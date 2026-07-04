import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import blogSlice from "./blogSlice";

const store = configureStore({
  reducer: { blogs: blogSlice, auth: authSlice },
});

export default store;
