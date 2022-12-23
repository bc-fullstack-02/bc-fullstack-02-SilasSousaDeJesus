import React from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import styles from "./signup.module.scss";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { UserRegistration } from "../../redux/authSlice/AuthSlice";


declare interface values {
  user: string;
  name: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    user: Yup.string()
      .test("len", "O limite maximo é de 10 caracteres", (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || val.length <= 10;
      })
      .required("Campo Obrigatorio!"),
    name: Yup.string().required("Campo Obrigatorio!"),
    password: Yup.string().required("Campo Obrigatorio!"),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (values: values, actions: any) => {
    const signup = {
      user: values.user,
      name: values.name,
      password: values.password,
    };
    await dispatch(UserRegistration(signup));

    navigate("/login");
  };

  return (
    <Container>
      <Formik
        initialValues={{
          user: "",
          name: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, handleChange }) => (
          <Form
            title="Faça seu cadastro!"
            footerText="Já tem conta? "
            footerLink="/login"
            onSubmit={handleSubmit}
          >
            <Input
              label="Usuario"
              type="text"
              name="user"
              id="user"
              placeholder="digite seu usuario"
              value={values.user}
              onChange={handleChange}
            ></Input>
            <div className={styles.erroField}>
              <ErrorMessage name="user" />
            </div>
            <Input
              label="NickName"
              type="text"
              name="name"
              id="name"
              placeholder="digite seu nickname"
              value={values.name}
              onChange={handleChange}
            ></Input>
            <div className={styles.erroField}>
              <ErrorMessage name="name" />
            </div>
            <Input
              label="Senha"
              type="password"
              name="password"
              id="password"
              placeholder="digite seu senha"
              value={values.password}
              onChange={handleChange}
            ></Input>
            <div className={styles.erroField}>
              <ErrorMessage name="password" />
            </div>
            <Button type="submit">Cadastrar</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
