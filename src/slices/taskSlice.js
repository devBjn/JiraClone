import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGelAllTaskType,
  apiGetAllPriority,
  apiGetAllStatus,
  apiGetTaskDetail,
  apiUpdateTask,
} from "../apis/taskAPI";

export const getAllTaskType = createAsyncThunk("task/getTaskType", async () => {
  try {
    const data = await apiGelAllTaskType();
    return data.content;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export const getAllPriority = createAsyncThunk("task/getPriority", async () => {
  try {
    const data = await apiGetAllPriority();
    return data.content;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export const getAllStatus = createAsyncThunk("task/getStatus", async () => {
  try {
    const data = await apiGetAllStatus();
    return data.content;
  } catch (error) {
    throw error?.response?.data?.message;
  }
});

export const getTaskDetail = createAsyncThunk(
  "task/taskDetail",
  async (taskId) => {
    try {
      const data = await apiGetTaskDetail(taskId);
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

export const handleUpdateTask = createAsyncThunk(
  "task/updateTaskDetail",
  async (payload) => {
    try {
      const data = await apiUpdateTask(payload);
      return data.content;
    } catch (error) {
      throw error?.response?.data?.message;
    }
  }
);

const initialState = {
  isLoading: false,
  taskType: [],
  priority: [],
  status: [],
  error: null,
  taskDetail: {
    priorityTask: {
      priorityId: 4,
      priority: "Lowest",
    },
    taskTypeDetail: {
      id: 2,
      taskType: "new task",
    },
    assigness: [
      {
        id: 3960,
        avatar: "https://ui-avatars.com/api/?name=Lâm",
        name: "Lâm",
        alias: "do-nhat",
      },
    ],
    lstComment: [],
    taskId: 10012,
    taskName: "Build input tag",
    alias: "build-input-tag",
    description: "",
    statusId: "1",
    originalEstimate: 13,
    timeTrackingSpent: 5,
    timeTrackingRemaining: 10,
    typeId: 2,
    priorityId: 4,
    projectId: 12639,
  },
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    changeDetail: (state, action) => {
      const { name, value } = action.payload;
      state.taskDetail[name] = value;
      const listUserAsign = state.taskDetail.assigness?.map((user, index) => {
        return user.id;
      });
      state.taskDetail = { ...state.taskDetail, listUserAsign };
    },
    changeAssignees: (state, action) => {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness,
        action.payload,
      ];
      const listUserAssign = state.taskDetail.assigness?.map((user, index) => {
        return user.id;
      });
      state.taskDetail = { ...state.taskDetail, listUserAssign };
    },
    removeUserFromTask: (state, action) => {
      state.taskDetail.assigness = [
        ...state.taskDetail.assigness.filter(
          (user) => user.id !== action.payload
        ),
      ];
      const listUserAssign = state.taskDetail.assigness?.map((user, index) => {
        return user.id;
      });
      state.taskDetail = { ...state.taskDetail, listUserAssign };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTaskType.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllTaskType.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        taskType: action.payload,
        error: null,
      };
    });
    builder.addCase(getAllTaskType.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
        taskType: null,
      };
    });

    builder.addCase(getAllPriority.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllPriority.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        priority: action.payload,
        error: null,
      };
    });
    builder.addCase(getAllPriority.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
        priority: null,
      };
    });

    builder.addCase(getAllStatus.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getAllStatus.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        status: action.payload,
        error: null,
      };
    });
    builder.addCase(getAllStatus.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.error.message,
        status: null,
      };
    });

    builder.addCase(getTaskDetail.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(getTaskDetail.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        taskDetail: action.payload,
      };
    });
    builder.addCase(getTaskDetail.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        taskDetail: null,
        error: action.error.message,
      };
    });

    builder.addCase(handleUpdateTask.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(handleUpdateTask.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        // taskDetail: {
        //   ...action.payload,
        //   assigness: [...state.taskDetail.assigness],
        // },
        taskDetail: action.payload,
      };
    });
    builder.addCase(handleUpdateTask.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        taskDetail: null,
        error: action.error.message,
      };
    });
  },
});

export const { changeDetail, changeAssignees, removeUserFromTask } =
  taskSlice.actions;
export default taskSlice.reducer;
