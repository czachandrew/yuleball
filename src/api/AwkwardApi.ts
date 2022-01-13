import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Router from "@/router/index";
import { useStore } from "@/store/index";

const baseUrl = "http://127.0.0.1:8000/api/";
// const baseUrl = "https://yule-ball.herokuapp.com/api/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : "",
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
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

export interface Objective {
  id: number;
  title: string;
  description: string;
  anchor: string;
  game: any;
  next: Objective;
  image: string;
}

export interface Award {
  description: string;
  anchor: string;
  fixed_amount: boolean;
  amount: number;
  status: string;
  reusable: boolean;
  image: string;
  image_url: string | null;
}

export interface AwardPayload {
  description: string;
  anchor: string;
  amount: number;
  reusable: boolean;
  image?: string;
}

export interface ObjectiveResults {
  count: number;
  next: string;
  previous: string;
  results: Objective[];
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
      const response = await axiosInstance.get(`${baseUrl}users/`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async currentUser(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${baseUrl}details/`);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //type, description, amount, house

  async addPoints(
    amount: number,
    house: number,
    type = "staff_award"
  ): Promise<any> {
    try {
      const payload = {
        type: type,
        house: house,
        amount: amount,
        user: 1,
        description: "For uncommon valor",
      };
      const response = await axiosInstance.post(`${baseUrl}events/`, payload);
    } catch (error) {
      console.log(error);
    }
  }

  async checkSlug(slug: string): Promise<any> {
    try {
      const response = await axiosInstance.post(`${baseUrl}slugcheck/`, {
        slug: slug,
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw Error(error.response.status);
      } else {
        throw error;
      }
    }
  }

  async getHouses(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${baseUrl}houses/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllObjectives(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${baseUrl}objectives/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllAwards(): Promise<any> {
    try {
      const response = await axiosInstance.get(`${baseUrl}awards/`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async destroyAward(id: number): Promise<any> {
    try {
      const response = await axiosInstance.delete(`${baseUrl}awards/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createAward(award: AwardPayload): Promise<Award> {
    try {
      const data = new FormData();
      if (award.image && award.image !== "") {
        data.append("image", award.image);
      }
      data.append("description", award.description);
      data.append("anchor", award.anchor);
      data.append("amount", String(award.amount));
      data.append("reusable", String(award.reusable));

      const response = await axiosInstance.post(`${baseUrl}awards/`, data);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
