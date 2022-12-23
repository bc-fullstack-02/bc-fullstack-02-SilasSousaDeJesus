import { FieldAttributes } from "formik";
import React from "react";
import styles from "./input.module.scss";

declare interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    FieldAttributes<any> {
  label?: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.label && (<label className={styles.inputLabel}> {props.label}</label>)}
      <input {...props} />
    </>
  );
};

export default Input;
