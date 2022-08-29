import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getPostComments = createAsyncThunk(
  "comment/getPostComments",
  async (postId) => {
    try {
      const { data } = await axios.get(`/comments/${postId}`);
      console.log("data getPostComments:>", data);
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);
export const createComment = createAsyncThunk(
  "comment/createComment",
  async (postId, comment) => {
    // console.log("postIdSLICE", postId);
    // console.log("commentSLICE", comment);
    try {
      const { data } = await axios.post(`/comments/${postId}`, {
        postId,
        comment,
      });
      // console.log("data CreateComments:>", data);
      return data;
    } catch (error) {
      console.log("Error", error);
    }
  }
);
const initialState = {
  comments: { items: [], status: "loading" },
};
const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducer: {},
  extraReducers: {
    [getPostComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loaded";
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [getPostComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [createComment.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = "loaded";
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [createComment.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});
export const commentReducer = commentSlice.reducer;
