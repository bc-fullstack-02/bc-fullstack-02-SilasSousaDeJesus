import React from "react";
import styles from "./form.module.scss";
import { FormikValues } from "formik";
import logo from "../../assets/logo.svg";
declare interface FormProps extends FormikValues {
  children?: React.ReactNode;
  footerText?: string;
  footerLink?: string;
  title?: string;
  subTitle?: string;
  onSubmit?: (event: any) => void;
}

const Form: React.FC<FormProps> = (props) => {
  const preventedSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(event);
  };

  return (
    <form onSubmit={preventedSubmit} className={styles.form}>
      {props.title && (
        <div className={styles.wrapLogo}>
          <img src={logo} alt="" className={styles.logo} />
          <div className={styles.formTitle}>
            <h1>{props.title}</h1>
          </div>
        </div>
      )}
      {props.subTitle && (
        <div className={styles.formSubTitle}>
          {" "}
          <h1>{props.subTitle}</h1>
        </div>
      )}
      {props.children}

      {props.footerText && (
        <div className={styles.formFooter}>
          <p>
            {props.footerText} <a href={props.footerLink}>Clique Aqui!</a>
          </p>
        </div>
      )}
    </form>
  );
};

export default Form;
