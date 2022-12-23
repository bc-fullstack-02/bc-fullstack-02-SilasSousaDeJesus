import React from "react";
import styles from "./cardMessage.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";

interface ICardMessageProps {
  description?: string;
  title?: string;
  profile?: string;
  likes?: Array<string>;
  comments?: Array<string>;
  img?: any;
}

const CardMessage: React.FC<ICardMessageProps> = (props) => {
  return (
    <div className={styles.HeroMessage} data-aos="fade-left">
      <div className={styles.wrapInfo}>
        <div className="">
          {props.img ? (
            <Avatar  src={props.img} />
          ) : (
            <AccountCircleIcon className={styles.iconProfile} />
          )}
          <p>{props.profile}</p>
        </div>
        <div className={styles.bodyMessage}>
          <h6>{props.title}</h6>
          <p>{props.description}</p>
        </div>
      </div>
      {props.likes || props.comments ? (
        <div className={styles.wrapLikes}>
          {props.likes && <div> Curtidas: {props.likes?.length} </div>}
          {props.comments && <div> Comentarios: {props.comments?.length} </div>}
        </div>
      ) : null}
    </div>
  );
};

export default CardMessage;
