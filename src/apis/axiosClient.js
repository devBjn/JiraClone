import axios from "axios";
const TOKENCYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MiIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjI1MjgwMDAwMCIsIm5iZiI6MTY2NzA2MjgwMCwiZXhwIjoxNzAyNDAwNDAwfQ.WRTj_6tr0SSgX4a_yoloJ5KyL5DGv9E21DyHyblms2A";
const BASEURL = "https://jiranew.cybersoft.edu.vn/api/";

const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    TokenCybersoft: TOKENCYBERSOFT,
  },
});

axiosClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.statusCode === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    throw error;
  }
);

export default axiosClient;
