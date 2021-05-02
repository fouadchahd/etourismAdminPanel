import React from "react";
import { Grid, Hidden, makeStyles } from "@material-ui/core";
import LeftNavBar from "../components/LeftNavBar";
import { Route } from "react-router";
import Users from "../components/Users";
import Profil from "../components/Profil";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));
const Main = () => {
  return (
    <div style={{ overflowY: "hidden" }}>
      <BrowserRouter basename="/admin">
        <Grid container>
          <Hidden xsDown>
            <Grid sm={4} md={3} lg={2} item>
              <LeftNavBar></LeftNavBar>
            </Grid>
          </Hidden>
          <Grid xs={12} sm={8} md={9} lg={10} item>
            <Route path="/users" component={Users} />
            <Route path="/profil" component={Profil} />
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default Main;
