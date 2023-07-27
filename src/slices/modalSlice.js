import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModalSearch: false,
  showModalProject: false,
  showModalDetail: false,
  taskId: null,
  projectDetail: {},
  showModalTask: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalSearch: (state, action) => {
      return { ...state, showModalSearch: true };
    },
    closeModalSearch: (state, action) => {
      return { ...state, showModalSearch: false };
    },
    openModalProject: (state, action) => {
      return {
        ...state,
        showModalProject: true,
        // componentContentDrawer: action.payload,
        projectDetail: action.payload,
      };
    },
    closeModalProject: (state, action) => {
      return { ...state, showModalProject: false };
    },
    showModalTask: (state, action) => {
      return { ...state, showModalTask: true };
    },
    closeModalTask: (state, action) => {
      return { ...state, showModalTask: false };
    },
    // openModalDetail: (state, action) => {
    //   return { ...state, taskDetail: action.payload, showModalDetail: true };
    // },
    closeModalDetail: (state) => {
      return { ...state, showModalDetail: false };
    },
    // setSubmitEditProject: (state, action) => {
    //   return { ...state, callbackSubmit: action.payload };
    // },
    openModalDetail: (state) => {
      return { ...state, showModalDetail: true };
    },
  },
});

export const {
  openModalSearch,
  closeModalSearch,
  openModalProject,
  closeModalProject,
  showModalTask,
  closeModalTask,
  closeModalDetail,
  openModalDetail,
} = modalSlice.actions;
export default modalSlice.reducer;
