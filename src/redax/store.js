import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { commentReducer } from "./slices/comment";
import { postReducer } from "./slices/posts";

const store = configureStore({
  reducer: {
    comments: commentReducer,
    posts: postReducer,
    auth: authReducer,
  },
});

export default store;
