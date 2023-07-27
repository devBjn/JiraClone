import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetUser, apiGetUserByProjectId, apiSignIn } from "../apis/userAPI";
import { apiAssignUserProject } from "../apis/projectAPI";
import AlertError from "../components/Alert/AlertError";

export const signIn = createAsyncThunk("user/signIn", async (values) => {
  try {
    const data = await apiSignIn(values);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.content));
    }
    return data.content;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export const getUserList = createAsyncThunk("user/getAll", async (keyword) => {
  try {
    const data = await apiGetUser(keyword);
    return data.content;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export const getUserListByProject = createAsyncThunk(
  "user/getListUserByProject",
  async (id) => {
    try {
      const data = await apiGetUserByProjectId(id);
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const assignUser = createAsyncThunk("user/assign", async (payload) => {
  try {
    const data = await apiAssignUserProject(payload);
    return data;
  } catch (error) {
    AlertError(error?.response?.data?.message);
  }
});

const initialState = {
  isLoading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  userList: [],
  arrUser: [],
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      return { ...state, isLoading: false, user: action.payload, error: null };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.error.message,
      };
    });

    builder.addCase(getUserList.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        userList: action.payload,
        error: null,
      };
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        userList: null,
        error: action.error.message,
      };
    });

    builder.addCase(assignUser.pending, (state) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(assignUser.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    });
    builder.addCase(assignUser.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
      };
    });

    builder.addCase(getUserListByProject.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getUserListByProject.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        arrUser: action.payload,
        error: null,
      };
    });
    builder.addCase(getUserListByProject.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        arrUser: null,
        error: action.error.message,
      };
    });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
