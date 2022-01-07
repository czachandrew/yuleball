import axios, { AxiosRequestConfig } from "axios";
import Router from "@/router/index";

const baseUrl = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "JWT " + localStorage.getItem("token")
      : "",
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Authorization = token ? `JWT ${token}` : "";
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (typeof error.response === "undefined") {
      console.log(
        "A server/network error occured. Looks like CORS might be the problem"
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url === baseUrl + "token/refresh/"
    ) {
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");
      if (refreshToken && refreshToken !== "undefined") {
        console.log(refreshToken);
        console.log("Here is the decoded refresh token");
        // const decode3 = refreshToken.split('.');
        // console.log(decode3);
        // console.log(jwt_decode(decode3[1]));
        // console.log(jwt_decode(refreshToken.split('.')[1]));
        const tokenParts = JSON.parse(window.atob(refreshToken.split(".")[1]));
        console.log("Here are the token parts");
        console.log(tokenParts);
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              console.log("here is the response after using the refresh token");
              console.log(response.data);
              localStorage.setItem("token", response.data.access);
              // localStorage.setItem('refresh', response.data.refresh);

              axiosInstance.defaults.headers.common["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh Token is epxired", tokenParts.exp, now);
          Router.push("/login");
        }
      } else {
        console.log("Refresh tokne is not available");
        Router.push("/login");
      }
    }
  }
);

interface AwkwardToken {
  access: string;
  refresh: string;
}

export class AwkwardApi {
  constructor() {
    console.log("Constructing API instance...");
  }

  async login(email: string, password: string): Promise<AwkwardToken> {
    try {
      const response = await axios.post(baseUrl + "token/", {
        email: email,
        password: password,
      });
      console.log("here is the loging response");
      console.log(response.data);
      localStorage.setItem("token", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUsers(): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}users/`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getHouses(): Promise<any> {
    try {
      const response = await axios.get(`${baseUrl}houses/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}