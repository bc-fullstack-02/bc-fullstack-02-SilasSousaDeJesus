import React from "react";
import styles from "./container.module.scss";

declare interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
