import React, { useEffect, useState } from "react";
import Container80 from "../../components/Container80";
import ContainerContent from "../../components/ContainerContent";
import Loading from "../../components/loading/Loading";
import NavBar from "../../components/NavBar";
import { selectToken } from "../../redux/authSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  GetTimeLinePost,
  selectPosts,
  likePost,
  DeslikePost,
} from "../../redux/postSlice/postSlice";
import { IPayloadToken } from "../../types/globalTypes";
import styles from "./timeline.module.scss";
import jwt_decode from "jwt-decode";
import Card from "../../components/Card";
import { deslike, like } from "../../services/api";
import { useNavigate } from "react-router-dom";

const TimeLine = () => {
  const posts = useAppSelector(selectPosts);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const token = useAppSelector(selectToken);
  const decodedToken = jwt_decode(token) as IPayloadToken;


  useEffect(() => {
    getTimeLinePosts();
  }, []);

  const getTimeLinePosts = async (): Promise<void> => {
    setLoadingComponent(true);
    await dispatch(GetTimeLinePost(decodedToken.profile._id));
    setLoadingComponent(false);
  };

  const likeInPost = async (
    profileCurrentId: string,
    postTargetId: string
  ): Promise<void> => {
    await like(profileCurrentId, postTargetId);
    getTimeLinePosts();
  };
  const DeslikeInPost = async (
    profileCurrentId: string,
    postTargetId: string
  ): Promise<void> => {
    await deslike(profileCurrentId, postTargetId);
    getTimeLinePosts();
  };

  const navigateForMessage = async (id:string) => {
    navigate(`/mensagem/${id}`)
  };


  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Container80>
        <div className={styles.containerStart}>
          <h1>Sua Rede</h1>
          <p>Veja o que seus amigos postaram</p>
          <div className={styles.wrapContent}>
            <ContainerContent>
              {posts.map((post) => {
                return (
                  <Card
                    title={post.title}
                    description={post.description}
                    key={post._id}
                    postTargetId={post._id}
                    profileCurrentId={decodedToken.profile._id}
                    navigateMsg={()=> navigateForMessage(post._id)}
                    like={post.likes}
                    onLike={() =>
                      likeInPost(decodedToken.profile._id, post._id)
                    }
                    onDeslike={() =>
                      DeslikeInPost(decodedToken.profile._id, post._id)
                    }
                  />
                );
              })}
            </ContainerContent>
          </div>
        </div>
      </Container80>
    </>
  );
};

export default TimeLine;
