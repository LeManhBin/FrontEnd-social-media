import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  deletePost,
  fetchCreatePost,
  getPostById,
  getPosts,
  getPostsByUser,
  likeUnLikePost,
  updateComment,
  updatePost,
} from "../../api/postApi";

const initialState = {
  post: {},
  posts: [],
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

//Get posts
export const actGetPosts = createAsyncThunk("post/actGetPosts", async () => {
  const data = await getPosts();
  return data || [];
});

//Get post by user
export const actGetPostsByUser = createAsyncThunk(
  "post/actGetPostsByUser",
  async (userId) => {
    const data = await getPostsByUser(userId);
    return data || [];
  }
);

//Get post by id
export const actGetPostById = createAsyncThunk(
  "post/actGetPostBy",
  async (postId) => {
    const data = await getPostById(postId);
    return data || [];
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
  },
  extraReducers: (builder) => {
    //Get posts
    builder.addCase(actGetPosts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetPosts.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetPosts.fulfilled, (state, action) => {
      state.posts = action.payload.data;
      state.isLoading = false;
    });

    //Get posts by user
    builder.addCase(actGetPostsByUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetPostsByUser.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetPostsByUser.fulfilled, (state, action) => {
      state.posts = action.payload.data;
      state.isLoading = false;
    });

    //Get post by  id
    builder.addCase(actGetPostById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetPostById.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetPostById.fulfilled, (state, action) => {
      state.post = action?.payload?.data;
      state.isLoading = false;
    });
  },
});

//Create post
export const actCreatePost = (data) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await fetchCreatePost(data);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//like unlike post
export const actLikeUnLikePost = (postId, userId) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await likeUnLikePost(postId, userId);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//delete post
export const actDeletePost = (userId, postId) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await deletePost(userId, postId);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//update post
export const actUpdatePost = (infoPost, data) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await updatePost(infoPost, data);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//Create comment
export const actCreateComment = (postId, data) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await createComment(postId, data);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//Delete post
export const actDeleteComment = (commentId) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await deleteComment(commentId);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};
//update post
export const actUpdateComment = (commentId, dataUpdate) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await updateComment(commentId, dataUpdate);
    dispatch(actGetPosts());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const { actUpdateLoadingCreate } = postSlice.actions;
export default postSlice.reducer;
