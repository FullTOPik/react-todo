import axios from "axios";
import { handleSuccess, handleError } from "./handlers";
import { baseApiUrl } from "../common/constants";
import { ITask, ParamsRegister } from "./types";

const baseUrl = `${baseApiUrl}/task`;

export const addTask = async (
  params: Required<ITask>,
  onSuccess: Function,
  onError: Function
) => {
  axios
    .post(`${baseUrl}/`, params)
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};

export const updateTask = async (onSuccess: Function, onError: Function) => {
  axios
    .patch(`${baseUrl}/`)
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};

export const getTasks = async (
  email: string,
  onSuccess: Function,
  onError: Function
) => {
  axios
    .get(`${baseUrl}`, { params: { email } })
    .then((response) => handleSuccess(response, onSuccess))
    .catch((error) => handleError(error, onError));
};
