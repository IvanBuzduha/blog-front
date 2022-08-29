import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redax/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const inputFileRef = React.useRef(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      avatarUrl: "",
    },
    mode: "onChange",
  });
  const [avatarUrl, setAvatarUrl] = useState();
  const handleChange = async (e) => {
    // console.log(e.target.files);
    // setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    // try {
    //   const formData = new FormData();
    //   const file = e.target.files[0];
    //   formData.append("image", file);
    //   const { data } = await axios.post("/uploads", formData);
    //   setAvatarUrl(data.avatarUrl);
    // } catch (error) {
    //   console.warn(error);
    //   alert("An error occurred while loading the file");
    // }
  };
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    console.log("data Reg:>> ", data);
    if (!data.payload) {
      alert("Register  failed!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Creating an account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} src={avatarUrl} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          hidden
          onChange={handleChange}
          ref={inputFileRef}
          // error={Boolean(errors.avatarUrl?.message)}
          // helperText={errors.avatarUrl?.message}
          // {...register("avatarUrl")}
        />
        <TextField
          className={styles.field}
          label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Enter full name" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Enter e-mail" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter password" })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Avatar URL"
          error={Boolean(errors.avatarUrl?.message)}
          helperText={errors.avatarUrl?.message}
          {...register("avatarUrl", { required: "Enter avatarUrl" })}
          fullWidth
        />
        {/* <Button
          onClick={() => inputFileRef.current.click()}
          variant="contained"
          size="large"
          fullWidth
        >
          Load Avatar
        </Button> */}
        <br />
        <br />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Register
        </Button>
      </form>
    </Paper>
  );
};
