import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetAllProject,
  apiGetProjectDetail,
  apiProjectCategory,
} from "../apis/projectAPI";

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async () => {
    try {
      const data = await apiGetAllProject();
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const getProjectCategory = createAsyncThunk(
  "project/projectCategory",
  async () => {
    try {
      const data = await apiProjectCategory();
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const getProjectDetail = createAsyncThunk(
  "project/projectDetail",
  async (projectId) => {
    try {
      const data = await apiGetProjectDetail(projectId);
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

const initialState = {
  isLoading: false,
  projectList: [],
  projectCategory: null,
  error: null,
  projectDetail: {},
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProject.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        projectList: action.payload,
        error: null,
      };
    });
    builder.addCase(getAllProject.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        projectList: null,
        error: action.error.message,
      };
    });

    builder.addCase(getProjectCategory.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProjectCategory.fulfilled, (state, action) => {
      return { ...state, isLoading: false, projectCategory: action.payload };
    });
    builder.addCase(getProjectCategory.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        projectCategory: null,
        error: action.error.message,
      };
    });

    builder.addCase(getProjectDetail.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getProjectDetail.fulfilled, (state, action) => {
      return { ...state, isLoading: false, projectDetail: action.payload };
    });
    builder.addCase(getProjectDetail.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        projectDetail: null,
        error: action.error.message,
      };
    });
  },
});

export default projectSlice.reducer;
