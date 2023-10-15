import API from "../environment/APIConfig";
import { Auth } from "../model/Auth";
import { MessageResponse } from "../model/MessageResponse";

const AUTH_ENDPOINTS = {
  REGISTER: "auth/sign-up",
  LOGIN: "auth/sign-in"
};

const AuthService = {
  register: (registerUser : Auth) =>
    API.post<MessageResponse>(AUTH_ENDPOINTS.REGISTER, registerUser).then(
      (res) => {
        console.log(res.data);
        return res.data
      }
    )
};

export default AuthService;