import { Paper } from "@material-ui/core";
import React from "react";
import AdminPanelHeader from "./AdminPanelHeader";
const Profil = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <AdminPanelHeader>Profil</AdminPanelHeader>
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam vel
        pariatur dolores illo minus quas atque accusamus iusto corporis. Id
        corporis maxime consequuntur. Odio repellendus dolores dolorum labore
        doloremque iure.
      </Paper>
    </div>
  );
};

export default Profil;
