import React from "react";
import styles from "./formPost.module.scss";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const painelBtn = () => {
  return (
    <div className={styles.PainelBtn}>
      <AddCircleOutlineIcon className={styles.addBtn}/>
    </div>
  );
};

export default painelBtn;
