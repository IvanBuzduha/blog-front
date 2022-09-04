import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import {
  fetchAllTags,
  fetchPopularPosts,
  fetchPosts,
  fetchTags,
} from "../redax/slices/posts";
import { Box, Typography } from "@mui/material";
import { getPostComments } from "../redax/slices/comment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useLocation, useParams } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, popularPosts } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);
  const { tag } = useParams();
  console.log("tag", tag);
  const location = useLocation();
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  // const isCommentsLoading = comments.status === "loading";

  // const commentsCount = comments.items.length;
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0); // first tab

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };
  // const commentCount = (postId) => {
  //   let count = 0;
  //   console.log("comments.items :>> ", comments.items);
  //   comments.items.forEach((comment) => {
  //     if (comment.postId === postId) {
  //       count++;
  //     }
  //   });
  //   return count;
  // };

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchPopularPosts());
    dispatch(fetchTags());
    // dispatch(fetchAllTags());
    // dispatch(getPostComments());
  }, []);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="New" {...a11yProps(0)} />
        <Tab label="Popular" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container spacing={4}>
          <Grid xs={8} item>
            {(isPostsLoading
              ? [...Array(5)]
              : tag
              ? posts.items.filter((obj) => obj?.tags.includes(tag))
              : posts.items
            ).map((obj, index) =>
              isPostsLoading ? (
                <Post key={index} isLoading={true} />
              ) : (
                <Post
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt
                    .substring(0, obj.createdAt.lastIndexOf(".") - 3)
                    .replace(/-/g, "/")
                    .replace(/T/g, " ")}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.comments.length}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              )
            )}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />

            {/* <CommentsBlock
              items={comments}
              // isLoading={isCommentsLoading}
            /> */}
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={4}>
          <Grid xs={8} item>
            {(isPostsLoading ? [...Array(5)] : popularPosts.items).map(
              (obj, index) =>
                isPostsLoading ? (
                  <Post key={index} isLoading={true} />
                ) : (
                  <Post
                    id={obj._id}
                    title={obj.title}
                    imageUrl={
                      obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                    }
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comments.length}
                    tags={obj.tags}
                    isEditable={userData?._id === obj.user._id}
                  />
                )
            )}
          </Grid>
          <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};
