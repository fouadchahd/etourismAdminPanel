import { Paper } from "@material-ui/core";
import React from "react";
import AdminPanelHeader from "./AdminPanelHeader";

const Users = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <AdminPanelHeader>Gestion des utilisateurs</AdminPanelHeader>
      <Paper
        style={{
          backgroundColor: "rgb(231 229 229 / 20%)",
          height: `calc(100vh - 60px)`,
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
          padding: "20px",
          boxShadow: "none",
        }}
        component="div"
      >
        USers
      </Paper>
    </div>
  );
};

export default Users;
