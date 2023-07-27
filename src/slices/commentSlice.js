import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAllComment } from "../apis/commentAPI";

export const getAllComment = createAsyncThunk(
  "comment/getAll",
  async (taskId) => {
    try {
      const data = await apiGetAllComment(taskId);
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

const initialState = {
  isLoading: false,
  listComment: [],
  error: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllComment.pending, (state, action) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      return { ...state, isLoading: false, listComment: action.payload };
    });
    builder.addCase(getAllComment.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        listComment: [],
        error: action.error.message,
      };
    });
  },
});

export default commentSlice.reducer;
