import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Utils } from "@components";
import navigationService from "../navigation/navigationService";
import { stores } from "../stores";

const instance = axios.create({
  baseURL: "https://dev-gostivarapp.herokuapp.com/api/"
});

instance.interceptors.request.use(
  async config => {
    const user = await Utils.getUserFromLocalStorage();
    if (
      user &&
      JSON.parse(user) &&
      JSON.parse(user).accessToken &&
      !config.url.includes("auth")
    ) {
      config.headers.Authorization = `Bearer ${JSON.parse(user).accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    console.log(error);
    if (
      error.response.status === 401 &&
      !error.response.config.url.includes("auth")
    ) {
      Utils.removeUserFromLocalStorage();
      navigationService.navigate("AuthScreen", {});
    }
    return Promise.reject(error);
  }
);

export default instance;
