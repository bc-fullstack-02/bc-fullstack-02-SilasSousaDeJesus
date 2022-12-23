import React, { ReactNode } from 'react'
import styles from "./containerContent.module.scss";

interface ContainerContentProps {
    children?: ReactNode;
  }

const ContainerContent: React.FC<ContainerContentProps> = (props) => {
  return (
    <div className={styles.containerContent}>
        {props.children}
    </div>
  )
}

export default ContainerContent