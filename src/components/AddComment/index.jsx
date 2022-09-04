import React, { useCallback } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redax/slices/auth";
import { createComment, getPostComments } from "../../redax/slices/comment";
import { useForm } from "react-hook-form";
export const AddComment = (props) => {
  const { id } = useParams();

  const [comment, setComment] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      comment: "",
    },
    mode: "onChange",
  });

  console.log("regisetr:>>", register);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = { comment };
      await axios.post(`/comments/${id}`, fields);
      // props.addComment(fields);
      setComment("");
    } catch (err) {
      console.warn(err);
      alert("An error occurred while creating the comment");
    }
  };
  // const fetchComments = useCallback(async () => {
  //   try {
  //     dispatch(getPostComments(id));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [id, dispatch]);
  // React.useEffect(() => {
  //   getPostComments();
  // }, []);

  return (
    <>
      {/* <div className={styles.root}> */}
      {/* <Avatar
          classes={{ root: styles.avatar }}          
          // src="https://mui.com/static/images/avatar/5.jpg"
        /> */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Write a comment"
          variant="outlined"
          maxRows={10}
          value={comment}
          // {...register("comment")}
          onChange={(e) => setComment(e.target.value)}
          multiline
          fullWidth
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
      {/* </div> */}
    </>
  );
};
