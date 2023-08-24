import { checkAuthUser, registration } from "../../api/auth";
import { ParamsRegister } from "../../api/types";
import {
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_START,
  LOGOUT,
} from "../types/auth";

export const startRegistration =
  ({
    onSuccess,
    onError,
    params,
  }: {
    onSuccess: Function;
    onError: Function;
    params: Required<ParamsRegister>;
  }) =>
  (dispatch: any) => {
    const onSuccessCurrent = ({ user }: { user: { email: string } }) => {
      setTimeout(() => {
        dispatch({
          type: REGISTRATION_SUCCESS,
          payload: { email: user.email },
        });
        onSuccess({ user });
      }, 2000);
    };

    const onCurrentError = (error: { message: string }) => {
      setTimeout(() => {
        dispatch({
          type: REGISTRATION_ERROR,
          payload: { error: error.message },
        });
        onError(error);
      }, 2000);
    };

    dispatch({ type: REGISTRATION_START });
    registration(params, onSuccessCurrent, onCurrentError);
  };

export const checkAuth =
  ({ redirect }: { redirect: Function }) =>
  (dispatch: any) => {
    const onSuccessCurrent = ({ email }: { email: string }) => {
      setTimeout(() => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: { email } });
      }, 2000);
    };

    const onCurrentError = (error: { message: string }) => {
      setTimeout(() => {
        dispatch({
          type: REGISTRATION_ERROR,
          payload: { error: error.message },
        });
        redirect("/registration");
      }, 2000);
    };

    dispatch({ type: REGISTRATION_START });
    checkAuthUser(onSuccessCurrent, onCurrentError);
  };

export const logout =
  ({ redirect }: { redirect: Function }) =>
  (dispatch: any) => {
    const onSuccessCurrent = () => {
      setTimeout(() => {
        dispatch({ type: LOGOUT });
        redirect("/registration");
      }, 2000);
    };

    const onCurrentError = (error: { message: string }) => {
      setTimeout(() => {
        dispatch({
          type: REGISTRATION_ERROR,
          payload: { error: error.message },
        });
      }, 2000);
    };

    dispatch({ type: REGISTRATION_START });
    checkAuthUser(onSuccessCurrent, onCurrentError);
  };
