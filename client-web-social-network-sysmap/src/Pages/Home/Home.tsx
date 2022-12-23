import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Container80 from "../../components/Container80";
import ContainerContent from "../../components/ContainerContent";
import NavBar from "../../components/NavBar";
import { selectToken } from "../../redux/authSlice/AuthSlice";
import Input from "../../components/Input";
import { Formik, ErrorMessage, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./home.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IPayloadToken } from "../../types/globalTypes";
import jwt_decode from "jwt-decode";
import {
  selectPosts,
  GetAllPostProfile,
  CreatePost,
  deletePost,
} from "../../redux/postSlice/postSlice";
import Modal from "react-bootstrap/Modal";
import Button from "../../components/Button";
import Loading from "../../components/loading/Loading";
import { deslike, like } from "../../services/api";
import { useNavigate } from "react-router-dom";

declare interface values {
  title: string;
  description: string;
}

const Home = () => {
  const [show, setShow] = useState(false);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()
  

  const PostSchema = Yup.object().shape({
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

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const decodedToken = jwt_decode(token) as IPayloadToken;
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async (): Promise<void> => {
    setLoadingComponent(true);
    await dispatch(GetAllPostProfile(decodedToken.profile._id));
    setLoadingComponent(false);
  };

  const onSubmit = async (values: values, actions: any) => {
    const post = {
      title: values.title,
      description: values.description,
    };
    await dispatch(
      CreatePost({ profileId: decodedToken.profile._id, post: post })
    );

    getPosts();

    handleClose();
  };

  const likeInPost = async (
    profileCurrentId: string,
    postTargetId: string
  ): Promise<void> => {
    await like(profileCurrentId, postTargetId);
    getPosts();
  };
  const DeslikeInPost = async (
    profileCurrentId: string,
    postTargetId: string
  ): Promise<void> => {
    await deslike(profileCurrentId, postTargetId);
    getPosts();
  };

  const navigateForMessage = async (id:string) => {
    navigate(`/mensagem/${id}`)
  };

  const navigateForEditPost = async (profileId:string, id:string) => {
    navigate(`/post/${profileId}/${id}`)
  };

  const delPost = async (profileId: string, postId: string): Promise<void> => {
    await dispatch(deletePost({ profileId: profileId, postId: postId }));
    getPosts();
  };



  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className={styles.wrapBtn}>
        <Button type="button" onClick={handleShow}>
          Crie um poste!
        </Button>
      </div>

      <Container80>
        <ContainerContent>
          {posts.map((post) => {
            return (
              <Card
                title={post.title}
                description={post.description}
                key={post._id}
                like={post.likes}
                postTargetId={post._id}
                profileCurrentId={decodedToken.profile._id}
                onLike={() => likeInPost(decodedToken.profile._id, post._id)}
                onDeslike={() =>
                  DeslikeInPost(decodedToken.profile._id, post._id)
                }
                onEdit={()=> navigateForEditPost(decodedToken.profile._id, post._id)}
                onDelete={() => delPost(decodedToken.profile._id, post._id)}
                navigateMsg={() => navigateForMessage(post._id)}
              />
            );
          })}
        </ContainerContent>
      </Container80>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              description: "",
            }}
            validationSchema={PostSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, handleChange }) => (
              <Form onSubmit={handleSubmit} className={styles.formAddPost}>
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
                  as="textarea"
                  value={values.description}
                  onChange={handleChange}
                  className={styles.textAreaAdd}
                ></Field>
                <div className={styles.erroField}>
                  <ErrorMessage name="description" />
                </div>
                <Button type="submit">Criar Post</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Home;
