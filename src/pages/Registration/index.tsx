import classNames from "classnames";
import { useCallback, useMemo, useState, ChangeEvent, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registration } from "../../api/auth";
import DefaultButton from "../../components/DefaultButton";
import Loader from "../../components/Loader";
import TextField from "../../components/TextField";
import { startRegistration } from "../../store/actions/auth";

import styles from "./Registration.module.css";

const initialFields = {
  login: "",
  password: "",
  repeatPassword: "",
};

const initialErrors = {
  login: false,
  password: false,
  repeatPassword: false,
  global: "",
};

const Registration = ({
  email,
  startRegistration,
}: {
  email: string;
  startRegistration: Function;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (email) navigate("/");
  });

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);

  const infoTextFields = useMemo(
    () => [
      {
        value: fields.login,
        label: "Login",
        className: "",
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          handlerField({ name: "login", value: event.target.value });
        },
        isError: errors.login,
      },
      {
        value: fields.password,
        label: "Password",
        className: styles["password-field"],
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          handlerField({ name: "password", value: event.target.value });
        },
        isError: errors.password,
      },
      {
        value: fields.repeatPassword,
        label: "Repeat Password",
        className: styles["password-field"],
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          handlerField({ name: "repeatPassword", value: event.target.value });
        },
        isError: errors.repeatPassword,
      },
    ],
    [fields, errors]
  );

  const addNewUser = useCallback(() => {
    const { login, password, repeatPassword } = fields;

    let isError = false;

    if (!login || !password || password !== repeatPassword) {
      isError = true;

      setErrors((prev) => ({
        ...prev,
        login: !login,
        password: !password,
        repeatPassword: !repeatPassword || password !== repeatPassword,
      }));
    }

    if (isError) return;

    const onSuccess = (data: any) => {
      setIsLoading(false);
      localStorage.setItem("auth", data);
    };

    const onError = (error: { message?: string }) => {
      setIsLoading(false);
      setErrors({ ...initialErrors, global: error?.message ?? "" });
    };

    setIsLoading(true);
    startRegistration({
      params: { email: login, password },
      onSuccess,
      onError,
    });
  }, [fields]);

  const handlerField = useCallback(
    ({
      name,
      value,
    }: {
      name: "login" | "password" | "repeatPassword";
      value: string;
    }) => setFields((prev) => ({ ...prev, [name]: value })),
    []
  );

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles["registration-page"]}>
        <div
          className={classNames(
            "flex-column",
            "align-center",
            "justify-center",
            "width-100",
            "height-100"
          )}
        >
          <div>
            {infoTextFields.map(
              ({ value, className, label, onChange, isError }) => (
                <TextField
                  onChange={onChange}
                  value={value}
                  label={label}
                  className={className}
                  isError={isError}
                />
              )
            )}
          </div>
          <DefaultButton className="mt-10" onClick={addNewUser}>
            LogIn
          </DefaultButton>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (store: any) => ({
  email: store.auth.userInfo.email,
});

const mapDispathToProps = { startRegistration: startRegistration };

export default connect(mapStateToProps, mapDispathToProps)(Registration);
