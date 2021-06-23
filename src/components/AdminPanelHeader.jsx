import React, { useState } from "react";
import { AppBar, Avatar, Toolbar, Tooltip } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";
import "./components.styles/adminPanelHeader.css";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const AdminPanelHeader = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const jwt_auth = Cookies.getJSON("jwt_auth");

  return (
    <div>
      <AppBar position="relative" className="appBar">
        <Toolbar>
          <Typography variant="h6" className={"appBarTitle"}>
            {props.children}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div className="appBarAccountInfoButton">
            <StyledBadge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              onClick={handleMenu}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg">
                M
              </Avatar>
            </StyledBadge>
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
              className={"headerMenu"}
            >
              <MenuItem className="text" onClick={handleClose}>
                Profile
              </MenuItem>
              <MenuItem className="text" onClick={handleClose}>
                Informations sur le compte
              </MenuItem>
              <MenuItem className="text" onClick={handleClose}>
                Déconnecter
              </MenuItem>
            </Menu>
            <div className="appBarAccountInfoText">
              <Tooltip
                title={`${jwt_auth.data.firstName} ${jwt_auth.data.lastName}`}
                placement="bottom-start"
              >
                <span className="accountInfoName">
                  {jwt_auth.data &&
                    `${jwt_auth.data.firstName} ${jwt_auth.data.lastName}`}
                </span>
              </Tooltip>
              <span className="accountInfoPseudo">@{jwt_auth.data.pseudo}</span>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AdminPanelHeader;
