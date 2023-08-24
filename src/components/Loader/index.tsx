import classNames from "classnames";
import styles from "./Loader.module.css";

const Loader = ({ className }: { className?: string }) => (
  <div
    className={classNames(
      "flex",
      "justify-center",
      "align-center",
      styles["loader-panel"]
    )}
  >
    <div className={classNames(styles.loader, className)}>Loading...</div>
  </div>
);

export default Loader;
