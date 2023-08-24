import classNames from "classnames";
import { ChangeEvent, ReactElement } from "react";

import styles from "./TextField.module.css";

interface ITextField {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: number | string;
  isError?: boolean;
  className?: string;
  label?: string;
  name?: string;
  labelClass?: string;
  inputClass?: string;
}

const TextField = ({
  onChange,
  className,
  label,
  name,
  labelClass,
  value,
  inputClass,
  isError,
}: ITextField): ReactElement => {
  return (
    <div className={classNames(styles["text-field"], className)}>
      <label
        className={classNames(classNames(styles.label, labelClass))}
        htmlFor=""
      >
        {label}
      </label>
      <input
        value={value}
        type="text"
        name={name}
        onChange={onChange}
        className={classNames(
          styles.field,
          inputClass,
          isError && styles["field-error"]
        )}
      />
    </div>
  );
};

export default TextField;
