import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/projectSlice";
import modalReducer from "./slices/modalSlice";
import taskReducer from "./slices/taskSlice";
import commentReducer from "./slices/commentSlice";

const store = configureStore({
  reducer: {
    userReducer,
    projectReducer,
    modalReducer,
    taskReducer,
    commentReducer,
  },
});

export default store;
