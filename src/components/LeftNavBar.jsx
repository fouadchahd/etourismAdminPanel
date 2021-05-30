import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./components.styles/leftNavBar.css";
import _logo from "../asserts/tripadvisor-logo-transparent.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
const NavItem = (props) => {
  const Icon = props.icon;
  const { pathname, search } = useLocation();
  console.log(pathname);
  console.log("search location" + search);
  return (
    <NavLink
      to={props.to}
      activeClassName="activeNavLinkItem"
      className="navLinkItem"
      /*isActive={() => "/locations" == pathname}*/
    >
      <div className="navLinkIcon">
        {" "}
        <Icon />
      </div>
      <div className="navLinkText">
        <span>{props.text}</span>
      </div>
    </NavLink>
  );
};
const LeftNavBar = () => {
  return (
    <div className="navWrapper">
      <header className="logoWrapper">
        <img className={"navLogo"} src={_logo} alt="_logo" />
      </header>
      <nav className="navContent">
        <div>
          <NavItem text="Accueil" to="/profil" icon={HomeIcon}></NavItem>
          <NavItem text="Utilisateurs" to="/users" icon={GroupIcon}></NavItem>
          <NavItem
            text="Statistiques"
            to="/stats"
            icon={EqualizerIcon}
          ></NavItem>
          <NavItem
            text="Lieux"
            to="/locations"
            icon={EditLocationIcon}
          ></NavItem>
        </div>
        <NavItem text="Déconnexion" to="/logout" icon={ExitToAppIcon}></NavItem>
      </nav>
    </div>
  );
};
export default LeftNavBar;
