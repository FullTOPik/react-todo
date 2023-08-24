import { connect } from "react-redux";
import { useEffect, useState } from "react";
import DefaultButton from "../../components/DefaultButton";
import TextField from "../../components/TextField";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import styles from "./Tasks.module.css";
import Header from "../../components/Header";
import { checkAuth } from "../../store/actions/auth";
import Loader from "../../components/Loader";
import { addTask, getTasks } from "../../api/tasks";

const initialFields = {
  title: "",
  description: "",
};

const Tasks = ({
  email,
  checkAuth,
  isLoading,
}: {
  email: string;
  checkAuth: Function;
  isLoading: boolean;
}) => {
  const [taskField, setTaskField] = useState(initialFields);
  const [componentLoading, setComponentLoading] = useState(false);
  const [tasks, setTasks] = useState<
    {
      title: string;
      description: string;
      timestamp: Date;
    }[]
  >([]);
  const navigate = useNavigate();

  const addOneTask = () => {
    const onSuccess = (newTask: any) => {
      setTasks((prev) => [newTask, ...prev]);
      setComponentLoading(false);
      setTaskField(initialFields);
    };
    const onError = () => {
      setComponentLoading(false);
      alert("I Server Error");
    };

    setComponentLoading(true);
    addTask(
      { title: taskField.title, description: taskField.description, email },
      onSuccess,
      onError
    );
  };

  useEffect(() => {
    if (!email) navigate("/registration");
  }, []);

  useEffect(() => {
    checkAuth({ redirect: navigate });
  }, []);

  useEffect(() => {
    if (!email) return;
    const onSuccess = (tasks: any) => {
      setTasks(tasks);
      setComponentLoading(false);
    };
    const onError = () => {
      setComponentLoading(false);
      alert("I Server Error");
    };

    setComponentLoading(true);
    getTasks(email, onSuccess, onError);
  }, [email]);

  return (
    <>
      {(isLoading || componentLoading) && <Loader />}
      <Header />
      <div className={styles.tasks}>
        <div className={classNames("flex", "align-center", "justify-center")}>
          <TextField
            onChange={(e) =>
              setTaskField((fields) => ({ ...fields, title: e.target.value }))
            }
            value={taskField.title}
            label={"Title"}
            className={styles["add-field"]}
          />
          <TextField
            onChange={(e) =>
              setTaskField((fields) => ({
                ...fields,
                description: e.target.value,
              }))
            }
            value={taskField.description}
            label={"Description"}
            className={styles["add-field"]}
          />
          <DefaultButton onClick={addOneTask}>Add</DefaultButton>
        </div>

        <div>
          {tasks[0] &&
            tasks.map(({ description, title, timestamp }) => (
              <div>
                <span>{title}</span>
                <span style={{ marginLeft: 10 }}>{description}</span>
                <span style={{ marginLeft: 10 }}>{timestamp.toString()}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default connect(
  (store: any) => ({
    email: store.auth.userInfo.email,
    isLoading: store.auth.isLoading,
  }),
  {
    checkAuth,
  }
)(Tasks);
