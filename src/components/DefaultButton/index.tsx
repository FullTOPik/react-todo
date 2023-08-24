import classNames from "classnames";
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
} from "react";

import styles from "./DefaultButton.module.css";

interface IDefaultButton {
  onClick: () => void;
  children: string;
  className?: string;
}

const DefaultButton = ({
  onClick,
  className,
  children,
}: IDefaultButton): ReactElement => {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
};

export default DefaultButton;
