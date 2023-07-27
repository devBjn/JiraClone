import AlertError from "../components/Alert/AlertError";
import axiosClient from "./axiosClient";

export const apiGelAllTaskType = async () => {
  const { data } = await axiosClient.get("TaskType/getAll");
  return data;
};

export const apiGetAllPriority = async () => {
  const { data } = await axiosClient.get("Priority/getAll");
  return data;
};

export const apiGetAllStatus = async () => {
  const { data } = await axiosClient.get("Status/getAll");
  return data;
};

export const apiCreateTask = async (payload) => {
  const { data } = await axiosClient.post("Project/createTask", payload);
  return data;
};

export const apiGetTaskDetail = async (taskId) => {
  const { data } = await axiosClient.get("Project/getTaskDetail", {
    params: {
      taskId,
    },
  });
  return data;
};

export const apiUpdateTask = async (payload) => {
  const { data } = await axiosClient.post("Project/updateTask", payload);
  return data;
};

export const apiRemoveTask = async (taskId) => {
  try {
    const { data } = await axiosClient.delete("Project/removeTask", {
      params: {
        taskId,
      },
    });
    return data;
  } catch (error) {
    AlertError(error?.response?.data?.message);
  }
};

export const apiUpdateStatusTask = async (taskId, statusId) => {
  const data = await axiosClient.put("Project/updateStatus", {
    taskId,
    statusId,
  });
  return data;
};
