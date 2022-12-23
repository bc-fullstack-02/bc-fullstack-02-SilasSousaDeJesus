import React, { useEffect, useState } from "react";
import Container80 from "../../components/Container80";
import NavBar from "../../components/NavBar";
import CardProfile from "../../components/CardProfile";
import styles from "./community.module.scss";
import {
  GetAllProfile,
  onfollowProfile,
  onUnfollowProfile,
  selectProfile,
} from "../../redux/profileSlice/profileSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IPayloadToken, IProfile } from "../../types/globalTypes";
import jwt_decode from "jwt-decode";
import { selectToken } from "../../redux/authSlice/AuthSlice";
import Loading from "../../components/loading/Loading";

const Community = () => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  const dispatch = useAppDispatch();
  const profiles = useAppSelector(selectProfile);
  const token = useAppSelector(selectToken);
  const decodedToken = jwt_decode(token) as IPayloadToken;

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async (): Promise<void> => {
    setLoadingComponent(true);
    await dispatch(GetAllProfile(decodedToken.profile._id));
    setLoadingComponent(false);
  };
  const follow = async (
    profileCurrentId: string,
    profileTargetId: string
  ): Promise<void> => {
    await dispatch(
      onfollowProfile({
        profileCurrentId: profileCurrentId,
        profileTargetId: profileTargetId,
      })
    );
    getProfile();
  };
  const unfollow = async (
    profileCurrentId: string,
    profileTargetId: string
  ): Promise<void> => {
    await dispatch(
      onUnfollowProfile({
        profileCurrentId: profileCurrentId,
        profileTargetId: profileTargetId,
      })
    );
    getProfile();
  };

  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Container80>
        <div className={styles.containerStart}>
          <h1>Comunidade Parrot</h1>
          <p>Siga outros membros</p>
          {profiles.map((profile) => {
            return (
              <CardProfile
                profileTargetId={profile._id}
                name={profile.name}
                following={profile.following}
                followers={profile.followers}
                key={profile._id}
                profileCurrentId={decodedToken.profile._id}
                onFollow={() => follow(decodedToken.profile._id, profile._id)}
                onUnfollow={() =>
                  unfollow(decodedToken.profile._id, profile._id)
                }
              />
            );
          })}
        </div>
      </Container80>
    </>
  );
};

export default Community;
