import axios from "axios";
import { handleSuccess, handleError } from "./handlers";
import { baseApiUrl } from "../common/constants";
import { ParamsRegister } from "./types";

const baseUrl = `${baseApiUrl}/auth`;

export const registration = async (
  params: Required<ParamsRegister>,
  onSuccess: Function,
  onError: Function
) => {
  axios
    .post(`${baseUrl}/register`, params)
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};

export const checkAuthUser = async (onSuccess: Function, onError: Function) => {
  axios
    .get(`${baseUrl}/check-auth`)
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};

export const logoutUser = async (onSuccess: Function, onError: Function) => {
  axios
    .get(`${baseUrl}/logout"`)
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};
