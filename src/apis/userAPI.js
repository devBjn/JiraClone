import axiosClient from "./axiosClient";

export const apiSignUp = async (values) => {
  const { data } = await axiosClient.post("Users/signup", values);
  return data;
};

export const apiSignIn = async (values) => {
  const { data } = await axiosClient.post("Users/signin", values);
  return data;
};

export const apiGetUserByProjectId = async (projectId) => {
  const { data } = await axiosClient.get("Users/getUserByProjectId", {
    params: {
      idProject: projectId,
    },
  });
  return data;
};

//api get user list of project
export const apiGetUser = async (keyword) => {
  const { data } = await axiosClient.get("Users/getUser", {
    params: {
      keyword,
    },
  });
  return data;
};
