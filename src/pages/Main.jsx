import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import LeftNavBar from "../components/LeftNavBar";
import { Route } from "react-router";
import Users from "../components/Users";
import { BrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import CreateLocation from "./CreateLocation";

const Main = () => {
  return (
    <div style={{ overflowY: "hidden" }}>
      <BrowserRouter basename="/">
        <Grid container>
          <Hidden smDown>
            <Grid md={3} lg={2} item>
              <LeftNavBar></LeftNavBar>
            </Grid>
          </Hidden>
          <Grid xs={12} sm={12} md={9} lg={10} item>
            <Route path="/users" render={(props) => <Users {...props} />} />
            <Route exact path="/" component={Home} />
            <Route path="/locations" component={CreateLocation} />
          </Grid>
        </Grid>
      </BrowserRouter>
    </div>
  );
};

export default Main;
