import React, { useCallback, useState } from "react";
import styles from "../components/AddComment/AddComment.module.scss";
import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { getPostComments } from "../redax/slices/comment";
import { Avatar } from "@mui/material";
import { fetchCommentForPost, fetchFullPosts } from "../redax/slices/posts";

export const FullPost = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  // console.log("state", this.state.first);
  // console.log("setData :>> ", setData);
  console.log("comments :>> ", comments.items.length);
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error while retrieving the article");
      });

    // dispatch(fetchFullPosts(id));
    // dispatch(fetchCommentForPost(id));
    dispatch(getPostComments(id));
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock items={comments.items} isLoading={false}>
        <div className={styles.root}>
          <Avatar classes={{ root: styles.avatar }} src={data.user.avatarUrl} />

          <AddComment />
        </div>
      </CommentsBlock>
    </>
  );
};
