import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});
export const fetchPopularPosts = createAsyncThunk(
  "posts/fetchPopularPosts",
  async () => {
    const { data } = await axios.get("/posts/popular");
    return data;
  }
);
export const fetchFullPosts = createAsyncThunk(
  "posts/fetchFullPosts",
  async (id) => {
    const { data } = await axios.get(`/posts/${id}`);
    return data;
  }
);
export const fetchTags = createAsyncThunk("fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => await axios.delete(`/posts/${id}`)
);
export const fiveComment = createAsyncThunk(
  "comments/fiveComment",
  async () => {
    const { data } = await axios.get(`/comments/firstfive`);
    return data;
  }
);
export const fetchCommentForPost = createAsyncThunk(
  "comments/fetchCommentForPost",
  async (id) => {
    const { data } = await axios.get(`/comments/${id}`);

    return data;
  }
);
const initialState = {
  posts: { items: [], status: "loading" },
  popularPosts: { items: [], status: "loading" },
  tags: { items: [], status: "loading" },
  // comments: { items: [], status: "loading" },
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducer: {},
  extraReducers: {
    //get acticle
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = "loaded";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    [fetchPopularPosts.pending]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "loaded";
    },
    [fetchPopularPosts.fulfilled]: (state, action) => {
      state.popularPosts.items = action.payload;
      state.popularPosts.status = "loaded";
    },
    [fetchPopularPosts.rejected]: (state) => {
      state.popularPosts.items = [];
      state.popularPosts.status = "error";
    },
    //get tags
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = "loaded";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    //get comment
    [fiveComment.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loaded";
    },
    [fiveComment.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fiveComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },

    //get comment
    [fetchCommentForPost.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loaded";
    },
    [fetchCommentForPost.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchCommentForPost.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },

    //remove article
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});
export const postReducer = postSlice.reducer;
