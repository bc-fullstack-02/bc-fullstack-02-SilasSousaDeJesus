import React, { useEffect, useState } from "react";
import styles from "./CardProfile.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { finOne } from "../../services/api";
import { IProfile } from "../../types/globalTypes";
import Loading from "../loading/Loading";

interface ICardProfile {
  name?: string;
  following: Array<string>;
  followers: Array<string>;
  profileTargetId: string;
  profileCurrentId: string;
  img?: any;
  onFollow: () => void;
  onUnfollow: () => void;
}

const CardProfile: React.FC<ICardProfile> = (props) => {
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [profile, setProfile] = useState<IProfile>();
  useEffect(() => {
    (async () => await finOneProfile())();
  }, []);

  const finOneProfile = async () => {
    setLoadingComponent(true);
    const currentProfile = await finOne(props.profileCurrentId);
    setProfile(currentProfile.data);
    setLoadingComponent(false);
  };


  if (loadingComponent) {
    return <Loading />;
  }

  return (
    <div className={styles.CardProfile} data-aos="fade-left">
      <div className={styles.wrapInfo}>
        {props.img ? (
          props.img
        ) : (
          <AccountCircleIcon className={styles.iconProfile} />
        )}

        <h4> {props.name}</h4>
        {profile?.following.includes(props.profileTargetId) ? (
          <button className={styles.btnUnfollow} onClick={props.onUnfollow}>
            UnFollow
          </button>
        ) : (
          <button className={styles.btnFollow} onClick={props.onFollow}>
            Follow
          </button>
        )}
      </div>

      <div className={styles.wrapFollowers}>
        <div>Seguindo: {props.following?.length}</div>
        <div className={styles.followers}>
          Seguidores: {props.followers?.length}
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
