import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import CardMessage from "../../components/CardMessage";
import Container80 from "../../components/Container80";
import Loading from "../../components/loading/Loading";
import NavBar from "../../components/NavBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  GetCommentPost,
  CreateAComment,
  selectComment,
} from "../../redux/commentSlice/commentSlice";
import { findOnePost } from "../../services/api";
import { IPost } from "../../types/globalTypes";
import styles from "./message.module.scss";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

declare interface values {
  description: string;
}

const Message = () => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [post, setPost] = useState<IPost>();
  const comments = useAppSelector(selectComment);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const commentSchema = Yup.object().shape({
    description: Yup.string()
      .test("len", "O limite maximo é de 240 caracteres", (val) => {
        if (val == undefined) {
          return true;
        }
        return val.length == 0 || val.length <= 240;
      })
      .required("Campo Obrigatorio!"),
  });

  useEffect(() => {
    getPostCurrent();
  }, []);

  const getPostCurrent = async (): Promise<void> => {
    setLoadingComponent(true);
    const payload = await findOnePost(id);
    setPost(payload.data);
    await dispatch(GetCommentPost(payload.data._id));
    setLoadingComponent(false);
  };

  const onSubmit = async (values: values, actions: any) => {
    const comment = {
      description: values.description,
    };
    await dispatch(
      CreateAComment({
        profileId: post!.profile._id,
        postId: post?._id,
        comment: comment,
      })
    );

    getPostCurrent();
  };

  if (loadingComponent) {
    return <Loading />;
  }
  return (
    <>
      <NavBar />
      <Container80>
        <div className={styles.wrapMessage}>
          <CardMessage
            key={post?._id}
            description={post?.description}
            likes={post?.likes}
            title={post?.title}
            profile={post?.profile.name}
            comments={post?.comments}
          />
          <Formik
            initialValues={{
              description: "",
            }}
            validationSchema={commentSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, handleChange }) => (
              <form className={styles.formMenssage} onSubmit={handleSubmit}>
                <Field
                  name="description"
                  id="description"
                  as="textarea"
                  value={values.description}
                  onChange={handleChange}
                  className={styles.textAreaAdd}
                ></Field>{" "}
                <div className={styles.erroField}>
                  <ErrorMessage name="description" />
                </div>
                <Button type="submit">Responder</Button>
              </form>
            )}
          </Formik>
          <div className={styles.responseMessage}>
            {comments.map((comment) => {
              return (
                <CardMessage
                  key={comment._id}
                  description={comment?.description}
                  profile={comment?.profile.name}
                  img={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                  }
                />
              );
            })}
          </div>
        </div>
      </Container80>
    </>
  );
};

export default Message;
