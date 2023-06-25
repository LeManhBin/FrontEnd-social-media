import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { KEY_ACCESS_TOKEN, KEY_IS_LOGGER } from "../../constants/config";
import {
  addRemoveFriend,
  changeAvatar,
  fetchGetUserLogin,
  fetchLoginUser,
  fetchRegisterUser,
  getAllFriend,
  getAllUser,
  getUserById,
  updateProfile,
} from "../../api/userApi";
import jwt_decode from "jwt-decode";

const initialState = {
  user: {},
  userById: {},
  users: [],
  friends: [],
  accessToken: localStorage.getItem(KEY_ACCESS_TOKEN) || "",
  isLogged: JSON.parse(localStorage.getItem(KEY_IS_LOGGER)) || false,
  isRegisterSuccess: false,
  isLoading: false,
  isLoadingCreate: false,
  errors: {},
};

export const actFetchLogin = createAsyncThunk(
  "user/actFetchLogin",
  async (payload) => {
    const data = await fetchLoginUser(payload);
    return data;
  }
);

export const actGetAllUser = createAsyncThunk(
  "user/actGetAllUser",
  async () => {
    const data = await getAllUser();
    return data || [];
  }
);

export const actGetUserById = createAsyncThunk(
  "user/actGetUserById",
  async (payload) => {
    const data = await getUserById(payload);
    return data;
  }
);

export const actGetAllFriends = createAsyncThunk(
  "user/actGetAllFriends",
  async (idUser) => {
    const data = await getAllFriend(idUser);
    return data;
  }
);

export const actGetMyUser = createAsyncThunk(
  "user/actGetMyUser",
  async (idUser) => {
    const data = await fetchGetUserLogin(idUser);
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actUpdateLoadingCreate: (state, action) => {
      state.isLoadingCreate = action.payload;
    },
    actUpdateIsRegisterSuccess: (state, action) => {
      state.isRegisterSuccess = action.payload;
    },
    actGetMe: (state, action) => {
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      localStorage.setItem(KEY_IS_LOGGER, JSON.stringify(true));
      state.isLogged = true;
    },
    actLogout: (state, action) => {
      localStorage.removeItem(KEY_ACCESS_TOKEN);
      localStorage.setItem(KEY_IS_LOGGER, JSON.stringify(false));
      state.isLogged = false;
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    //Login
    builder.addCase(actFetchLogin.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actFetchLogin.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actFetchLogin.fulfilled, (state, action) => {
      const { user } = action?.payload?.data;
      const { token } = action?.payload?.data;
      if (token) {
        state.user = user;
        (state.accessToken = token),
          localStorage.setItem(KEY_IS_LOGGER, JSON.parse(true));
        state.isLogged = true;
        localStorage.setItem(KEY_ACCESS_TOKEN, token);
      }
      state.isLoading = false;
    });

    //get all users
    builder.addCase(actGetAllUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetAllUser.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetAllUser.fulfilled, (state, action) => {
      state.users = action?.payload?.data?.data;
      state.isLoading == false;
    });

    //get User by id
    builder.addCase(actGetUserById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetUserById.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetUserById.fulfilled, (state, action) => {
      state.userById = action?.payload?.data?.data;
      state.isLoading == false;
    });

    //get all friend
    builder.addCase(actGetAllFriends.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetAllFriends.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetAllFriends.fulfilled, (state, action) => {
      state.friends = action?.payload?.data?.data;
      state.isLoading == false;
    });

    //get my user
    builder.addCase(actGetMyUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(actGetMyUser.rejected, (state) => {
      state.errors = {
        error: "Error",
      };
      state.isLoading = false;
    });

    builder.addCase(actGetMyUser.fulfilled, (state, action) => {
      state.user = action?.payload?.data?.data;
      state.isLoading == false;
    });
  },
});

//Register
export const actRegister = (data) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await dispatch(actUpdateIsRegisterSuccess(true));
    await fetchRegisterUser(data);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
    dispatch(actUpdateIsRegisterSuccess(false));
  }
};

//Login
export const actReLogin = (token) => async (dispatch) => {
  try {
    const decodeToken = jwt_decode(token);
    if (decodeToken?.id) {
      const decodeData = await fetchGetUserLogin(decodeToken?.id);
      const user = decodeData?.data?.data;
      dispatch(actGetMe(user));
      dispatch(loginSuccess());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//Add remove friend
export const actAddRemoveFriend = (idUser, idFriend) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await addRemoveFriend(idUser, idFriend);
    await dispatch(getAllFriend(idUser));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//Update User
export const actUpdateProfile = (idUser, dataUpdate) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await updateProfile(idUser, dataUpdate);
    dispatch(actGetAllUser());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

//Change avatar
export const actChangeAvatar = (idUser, dataUpdate) => async (dispatch) => {
  try {
    dispatch(actUpdateLoadingCreate(true));
    await changeAvatar(idUser, dataUpdate);
    dispatch(actGetAllUser());
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actUpdateLoadingCreate(false));
  }
};

export const {
  actUpdateLoadingCreate,
  actUpdateIsRegisterSuccess,
  actGetMe,
  loginSuccess,
  actLogout,
} = userSlice.actions;
export default userSlice.reducer;
