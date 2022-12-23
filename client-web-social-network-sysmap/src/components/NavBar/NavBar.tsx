import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navBar.module.scss";
import { Menu } from "@mui/icons-material";
import { userlogout } from "../../redux/authSlice/AuthSlice";
import { useAppDispatch } from "../../redux/hooks";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/logo.svg";
import { navlink } from "./dataNavLinks";
declare interface NavLink {
  url: string;
  text: string;
}
declare interface HeaderProps {
  navlink: NavLink[];
  logo?: string;
}

const NavBar = () => {
  const [responsive, setResponsive] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(userlogout());
    navigate("/login");
  };

  return (
    <>
      <div className={styles.headerContainer} data-aos="fade-right">
        <div className={styles.wraplogo} >
          <Link to={"/home"}>
            <img src={logo} className={styles.logo} alt="" />
          </Link>
        </div>

        <div className={responsive ? styles.hideMenu : styles.nav} >
          {navlink.map((links, i) => (
            <Link to={links.url} key={i}>
              {links.text}
            </Link>
          ))}
          <a className={styles.btnLogout} onClick={() => handleLogout()}>
            <LogoutIcon />
          </a>
        </div>

        <div>
          <button
            className={styles.toggle}
            onClick={() => setResponsive(!responsive)}
          >
            <Menu className="icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
