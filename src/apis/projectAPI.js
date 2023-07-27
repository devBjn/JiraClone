import AlertError from "../components/Alert/AlertError";
import axiosClient from "./axiosClient";

export const apiGetAllProject = async () => {
  const { data } = await axiosClient.get("Project/getAllProject");
  return data;
};

export const apiRemoveUserFromProject = async (payload) => {
  try {
    const { data } = await axiosClient.post(
      "Project/removeUserFromProject",
      payload
    );
    return data;
  } catch (error) {
    AlertError(error?.response?.data?.message);
  }
};

export const apiProjectCategory = async () => {
  const { data } = await axiosClient.get("ProjectCategory");
  return data;
};

export const apiCreateProjectAuthorize = async (payload) => {
  const { data } = await axiosClient.post(
    "Project/createProjectAuthorize",
    payload
  );
  return data;
};

export const apiAssignUserProject = async (payload) => {
  const { data } = await axiosClient.post(
    "/Project/assignUserProject",
    payload
  );
  return data;
};

export const apiGetProjectDetail = async (id) => {
  const { data } = await axiosClient.get("Project/getProjectDetail", {
    params: {
      id,
    },
  });
  return data;
};

export const apiUpdateProject = async (payload) => {
  const { data } = await axiosClient.put(
    `Project/updateProject?projectId=${payload.id}`,
    payload
  );
  return data;
};

export const apiDeleteProject = async (projectId) => {
  try {
    const { data } = await axiosClient.delete("Project/deleteProject", {
      params: {
        projectId,
      },
    });
    return data;
  } catch (error) {
    AlertError(error?.response?.data?.message);
  }
};
