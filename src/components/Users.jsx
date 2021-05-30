import {
  Backdrop,
  CircularProgress,
  Grid,
  InputBase,
  Paper,
  Tooltip,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AdminPanelHeader from "./AdminPanelHeader";
import SearchIcon from "@material-ui/icons/Search";
import "./components.styles/userTable.css";

import {
  getAdmins,
  getToken,
  getUsers,
  getTourists,
  getUsersByPseudo,
  getTouristCount,
  getUsersCount,
} from "../services/users.service";
import UsersTable from "./UsersTable";
import { Pagination } from "@material-ui/lab";
const Users = () => {
  const [paginationConfig, setPaginationConfig] = useState({
    itemsPerPage: 9,
    page: 1,
  });
  const [pseudoToSearchBy, setpseudoToSearchBy] = useState(null);
  const [users, setusers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const handleChange = (event, value) => {
    setPaginationConfig({ ...paginationConfig, page: value });
  };

  const handleSearch = ({ target: { value } }) => {
    setpseudoToSearchBy(value);
  };
  const doSearchByPseudo = async () => {
    console.log("Start doSearchByPseudo");
    if (pseudoToSearchBy) {
      await getUsersByPseudo(
        { itemsPerPage: paginationConfig.itemsPerPage, page: 1 },
        pseudoToSearchBy
      ).then(({ data }) => {
        setusers([...data["hydra:member"]]);
        setUserCount(data["hydra:totalItems"]);
        console.log("END_FETCHING");
      });
    } else {
      console.log("Tap a valid pseudo");
    }
  };
  useEffect(async () => {
    setIsLoading(true);
    await getTourists(paginationConfig)
      .then(async ({ data }) => {
        setusers([...data["hydra:member"]]);
        setUserCount(data["hydra:totalItems"]);
        console.log("END_FETCHING");
        const test = await getUsersCount();
        console.log("total item" + test);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationConfig]);
  return (
    <div style={{ backgroundColor: "white" }}>
      <AdminPanelHeader>Gestion des utilisateurs</AdminPanelHeader>
      <Paper
        style={{
          backgroundColor: "rgb(231 229 229 / 20%)",
          minHeight: `calc(100vh - 60px)`,
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "20px",
          padding: "20px",
          boxShadow: "none",
        }}
        component="div"
      >
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ marginBottom: "16px" }}
        >
          <Grid item xs={12} sm={6}>
            {userCount > 0 && (
              <Pagination
                count={Math.ceil(userCount / paginationConfig.itemsPerPage)}
                defaultPage={1}
                page={paginationConfig.page}
                onChange={handleChange}
                className={"pagination"}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={"search"}>
              <div className={"searchIcon"} onClick={doSearchByPseudo}>
                <Tooltip
                  title={
                    "appuyez vous sur le bouton pour commencer votre recherche"
                  }
                  placement="bottom-start"
                >
                  <SearchIcon />
                </Tooltip>
              </div>
              <Backdrop style={{ zIndex: 1201 }} open={isLoading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              <InputBase
                placeholder="Rechercher par nom d'utilisateur…"
                onChange={handleSearch}
                classes={{
                  root: "inputRoot",
                  input: "inputInput",
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
        </Grid>
        <UsersTable data={users}></UsersTable>
      </Paper>
    </div>
  );
};

export default Users;
