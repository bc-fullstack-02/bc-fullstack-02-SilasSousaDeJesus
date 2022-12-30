import React from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Field from "../../components/Input";
import styles from "./login.module.scss";
import {selectToken, userAuthentication} from '../../redux/authSlice/AuthSlice'
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";

declare interface values {
  user: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useAppSelector(selectToken)
  const LoginSchema = Yup.object().shape({
    user: Yup.string().required("Campo Obrigatorio!"),
    password: Yup.string().required("Campo Obrigatorio!"),
  });

  const onSubmit = async (values: values, actions: any) => {

    const login = {
      user: values.user,
      password: values.password,
    };
     await dispatch(userAuthentication(login))
     if(token){
      navigate('/home')
     } else {
      return Swal.fire("Oops!", "Email ou Senha Invalida!", "error");
     }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          user: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form
            onSubmit={handleSubmit}
            title="Bem-Vindo"
            footerText="Ainda não tem conta? "
            footerLink="/cadastre-se"
          >
            <Field
              label="Usuario"
              type="text"
              name="user"
              id="user"
              placeholder="digite seu usuario"
              value={values.user}
              onChange={handleChange}
            ></Field>
            <div className={styles.erroField}>
              <ErrorMessage name="user" />
            </div>
            <Field
              label="Senha"
              type="password"
              name="password"
              id="password"
              placeholder="digite seu senha"
              value={values.password}
              onChange={handleChange}
            ></Field>
            <div className={styles.erroField}>
              <ErrorMessage name="password" />
            </div>

            <Button type="submit">Entrar</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
