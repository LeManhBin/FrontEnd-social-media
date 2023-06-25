import axios from "axios";
import { BE_URL, KEY_ACCESS_TOKEN } from "../constants/config";
import { toast } from "react-toastify";

const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN) || null;

//Create post
export const fetchCreatePost = async (post) => {
  try {
    const data = await axios.post(`${BE_URL}posts`, post, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    toast.success("Đăng bài thành công!");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//Get posts
export const getPosts = async () => {
  try {
    const data = await axios.get(`${BE_URL}posts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//Get post by id
export const getPostById = async (postId) => {
  try {
    const data = await axios.get(`${BE_URL}posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//Get posts by user
export const getPostsByUser = async (userId) => {
  try {
    const data = await axios.get(`${BE_URL}posts/${userId}/posts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//like unlike post
export const likeUnLikePost = async (postId, userId) => {
  try {
    const data = await axios.patch(
      `${BE_URL}posts/${postId}/like`,
      { userId: userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//delete post
export const deletePost = async (userId, postId) => {
  try {
    const data = await axios.delete(
      `${BE_URL}posts/user/${userId}/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Xoá bài viết thành công!");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//update post
export const updatePost = async (infoPost, dataUpdate) => {
  try {
    const data = await axios.put(
      `${BE_URL}posts/user/${infoPost?.userId}/post/${infoPost?.postId}`,
      dataUpdate,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Cập nhật bài viết thành công!");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//Comment post
export const createComment = async (postId, comment) => {
  try {
    const data = await axios.post(
      `${BE_URL}posts/comment/${postId}`,
      {
        userId: comment.userId,
        description: comment.description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//delete comment
export const deleteComment = async (commentId) => {
  try {
    const data = await axios.delete(`${BE_URL}posts/comment/${commentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    toast.success("Xoá bình luận thành công!");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

//update comment
export const updateComment = async (commentId, dataUpdate) => {
  try {
    const data = await axios.put(
      `${BE_URL}posts/comment/${commentId}`,
      {
        userId: dataUpdate.userId,
        description: dataUpdate.description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Chỉnh sửa bình luận thành công!");
    return data;
  } catch (error) {
    toast.error(error);
  }
};
