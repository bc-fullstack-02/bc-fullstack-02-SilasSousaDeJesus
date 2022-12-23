import React, { useEffect, useState } from "react";
import styles from "./Card.module.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IProfile } from "../../types/globalTypes";
import { finOne } from "../../services/api";
import Loading from "../loading/Loading";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface ICard {
  title?: string;
  description?: string;
  img?: any;
  like?: Array<string>;
  postTargetId: string;
  profileCurrentId: string;
  navigateMsg?: () => void;
  onLike?: () => void;
  onDeslike?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

const Card: React.FC<ICard> = (props) => {
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
    <div className={styles.Card} data-aos="fade-left">


      <div className={styles.wrapLikeIcon}>
        {props.img ? props.img : <AccountCircleIcon className={styles.iconProfile}/>}
        <div>
          {profile?.myLikes.includes(props.postTargetId) ? (
            <ThumbUpIcon
              className={styles.iconBtnisLike}
              onClick={props.onDeslike}
            />
          ) : (
            <ThumbUpOffAltIcon
              className={styles.iconBtnisLike}
              onClick={props.onLike}
            />
          )}
          <p>{props.like?.length}</p>
        </div>
      </div>


      <h2>{props.title}</h2>
      <p>{props.description}</p>
      <img src={props.img} alt="" className={styles.img} />
      <div className={styles.wrapIconsBtn}>
        {props.navigateMsg && (
          <MessageIcon className={styles.iconBtn} onClick={props.navigateMsg} />
        )}
        {props.onEdit && (
          <BorderColorIcon className={styles.iconBtn} onClick={props.onEdit} />
        )}

        {props.onDelete && (
          <DeleteForeverIcon
            className={styles.iconBtn}
            onClick={props.onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
