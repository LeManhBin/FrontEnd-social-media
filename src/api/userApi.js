import axios from "axios";
import { BE_URL, KEY_ACCESS_TOKEN } from "../constants/config";
import { toast } from "react-toastify";

const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN) || null;

// Register
export const fetchRegisterUser = async (user) => {
  try {
    const data = await axios.post(`${BE_URL}auth/register`, user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Đăng ký thành công");
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.warning(error.response.data.message);
    } else {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }
};

// Login
export const fetchLoginUser = async (payload) => {
  try {
    const data = await axios.post(`${BE_URL}auth/login`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Đăng nhập thành công");
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.warning("Email đã tồn tại");
    } else {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }
};

//Get user Login
export const fetchGetUserLogin = async (id) => {
  try {
    const data = await axios.get(`${BE_URL}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.warning(error.response.data.message);
    } else {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }
};
//Get all  user
export const getAllUser = async () => {
  try {
    const data = await axios.get(`${BE_URL}users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.warning(error.response.data.message);
    } else {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }
};

//Get user by Id
export const getUserById = async (id) => {
  try {
    const data = await axios.get(`${BE_URL}users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    if (error.response.status === 400) {
      toast.warning(error.response.data.message);
    } else {
      toast.error("Có lỗi xảy ra vui lòng thử lại");
    }
  }
};

//Add remove friend
export const addRemoveFriend = async (idUser, idFriend) => {
  try {
    const data = await axios.patch(`${BE_URL}users/${idUser}/${idFriend}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// get friend
export const getAllFriend = async (idUser) => {
  try {
    const data = await axios.get(`${BE_URL}users/${idUser}/friends`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    toast.warning(error);
  }
};

// update Profile
export const updateProfile = async (idUser, dataUpdate) => {
  try {
    const data = await axios.put(
      `${BE_URL}users/${idUser}`,
      {
        firstName: dataUpdate.firstName,
        lastName: dataUpdate.lastName,
        location: dataUpdate.location,
        occupation: dataUpdate.occupation,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Cập nhật thông tin thành công!");
    return data;
  } catch (error) {
    toast.warning(error);
  }
};
// change aVATAR
export const changeAvatar = async (idUser, dataUpdate) => {
  try {
    const data = await axios.put(
      `${BE_URL}users/avatar/${idUser}`,
      dataUpdate,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    toast.success("Cập nhật thông tin thành công!");
    return data;
  } catch (error) {
    toast.warning(error);
  }
};
