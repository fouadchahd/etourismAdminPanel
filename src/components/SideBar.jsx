import React, { useState } from "react";
import { Button, Drawer, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GroupIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import { Link, NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import "./components.styles/leftNavBar.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  headerRoot: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: theme.palette.primary,
  },
}));
const listElement = (text) => {
  return (
    <NavLink
      isActive={false}
      to="/"
      activeClassName="activeNavLinkItem"
      className="navLinkItem"
    >
      <div className="navLinkIcon">
        {" "}
        <PlusOneIcon />
      </div>
      <div className="navLinkText">
        <span>{text}</span>
      </div>
    </NavLink>
  );
};
const SideBar = () => {
  const styles = useStyles();
  const [openDrawer, setopenDrawer] = useState(false);
  const [openLocationSubMenu, setopenLocationSubMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const toggleDrawer = () => {
    setopenDrawer(!openDrawer);
  };
  const handlesubmenu = () => {
    setopenLocationSubMenu(!openLocationSubMenu);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.headerRoot}>
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            ></IconButton>
            <Typography variant="h6" className={styles.title}>
              Photos
            </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size={"large"}
              >
                <AccountCircle fontSize={"large"} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>
                  Informations sur le compte
                </MenuItem>
                <MenuItem onClick={handleClose}>Déconnecter</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </div>
      </div>
      <Drawer anchor={"top"} open={openDrawer} onClose={toggleDrawer}>
        {listElement("Home")}
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Accueil"} />
          </ListItem>

          <Link
            to="/addLocation"
            className="stle"
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"Utilisateurs"} />
            </ListItem>
          </Link>
          <ListItem button onClick={handlesubmenu}>
            <ListItemIcon>
              <EditLocationIcon />
            </ListItemIcon>
            <ListItemText primary={"Gestion des lieux"} />
            {openLocationSubMenu ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openLocationSubMenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/addLocation" style={{ textDecoration: "none" }}>
                <ListItem button className={styles.nested}>
                  <ListItemIcon>
                    <PlusOneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ajouter un lieu" />
                </ListItem>
              </Link>
              <Link to="/explore" style={{ textDecoration: "none" }}>
                <ListItem button className={styles.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary="Explore" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
