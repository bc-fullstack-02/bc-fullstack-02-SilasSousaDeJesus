import { ErrorMessage, Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Form from "../../components/Form";
import Input from "../../components/Input";
import styles from "./ediPost.module.scss";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../redux/hooks";
import { EditAPost } from "../../redux/postSlice/postSlice";
import Loading from "../../components/loading/Loading";
import { IPost } from "../../types/globalTypes";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { findOnePost } from "../../services/api";

declare interface values {
  title: string | undefined;
  description: string | undefined;
}

const editPostSchema = Yup.object().shape({
  title: Yup.string()
    .test("len", "O limite maximo é de 35 caracteres", (val) => {
      if (val == undefined) {
        return true;
      }
      return val.length == 0 || val.length <= 35;
    })
    .required("Campo Obrigatorio!"),
  description: Yup.string()
    .test("len", "O limite maximo é de 240 caracteres", (val) => {
      if (val == undefined) {
        return true;
      }
      return val.length == 0 || val.length <= 240;
    })
    .required("Campo Obrigatorio!"),
});

const EditPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loadingComponent, setLoadingComponent] = useState(false);
  const [post, setPost] = useState<IPost>();

  const { profileId, id } = useParams();

  useEffect(() => {
    getPostCurrent();
  }, []);

  const getPostCurrent = async (): Promise<void> => {
    setLoadingComponent(true);
    const payload = await findOnePost(id);
    setPost(payload.data);
    setLoadingComponent(false);
  };

  const onSubmit = async (values: values, actions: any) => {
    try {
      const post = {
        title: values.title,
        description: values.description,
      };
      setLoadingComponent(true);
      await dispatch(
        EditAPost({ profileId: profileId, postId: id, post: post })
      );
      setLoadingComponent(false);
      navigate("/home");
    } catch (error) {
      return Swal.fire("Oops!", "Não foi possivel editar este post!", "error");
    }
  };
  if (loadingComponent) {
    return <Loading />;
  }
  return (
    <Container>
      <Formik
        initialValues={{
          title: post?.title,
          description: post?.description,
        }}
        validationSchema={editPostSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, values, handleChange, setFieldValue }) => (
          <Form title="Edição de Post" onSubmit={handleSubmit}>
            <Input
              label="Título"
              type="text"
              name="title"
              id="title"
              placeholder="Dê um titulo ao post"
              value={values.title}
              onChange={handleChange}
            ></Input>
            <div className={styles.erroField}>
              <ErrorMessage name="title" />
            </div>
            <label htmlFor="description">Descrição</label>
            <Field
              name="description"
              id="description"
              cols={50}
              rows={3}
              initialValues={post?.description}
              as="textarea"
              value={values.description}
              onChange={handleChange}
              className={styles.textAreaEdit}
            ></Field>
            <div className={styles.erroField}>
              <ErrorMessage name="description" />
            </div>
            <Button type="submit">Editar Post</Button>

            <div className={styles.wrapBackBtn}>
              <a href="/home">
                <ArrowBackIcon className={styles.backBtn} />
              </a>
              <p>Voltar a Home</p>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default EditPost;
