import React from "react";
import styles from "./container80.module.scss";

declare interface ContainerProps90 {
  children?: React.ReactNode;
}

const Container80: React.FC<ContainerProps90> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container80;
