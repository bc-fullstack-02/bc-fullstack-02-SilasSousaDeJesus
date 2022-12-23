import React from "react";
import styles from "./containerAnimated.module.scss";
import Arrow from "../Arrow/Arrow";

declare interface ContainerAnimatedProps {
  children?: React.ReactNode;
}

const ContainerAnimated: React.FC<ContainerAnimatedProps> = (props) => {
  return (
    <>
      <div className={styles.context} data-aos="fade-right">
        <a href="/login">
          <h1>Conecte-se a um novo mundo <span><Arrow/></span></h1> 
        </a>
      </div>

      <div className={styles.area}>
        <ul className={styles.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
};

export default ContainerAnimated;
