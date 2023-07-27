import AlertError from "../components/Alert/AlertError";
import axiosClient from "./axiosClient";

export const apiGetAllComment = async (taskId) => {
  const { data } = await axiosClient.get("Comment/getAll", {
    params: {
      taskId,
    },
  });
  return data;
};

export const apiInsertComment = async (payload) => {
  const { data } = await axiosClient.post("Comment/insertComment", payload);
  return data;
};

export const apiUpdateComment = async (idComment, contentComment) => {
  const { data } = await axiosClient.put(
    `Comment/updateComment?id=${idComment}&contentComment=${contentComment}`
  );
  return data;
};

export const apiRemoveComment = async (idComment) => {
  try {
    const { data } = await axiosClient.delete("Comment/deleteComment", {
      params: {
        idComment,
      },
    });
    return data;
  } catch (error) {
    AlertError(error?.response?.data?.message);
  }
};
