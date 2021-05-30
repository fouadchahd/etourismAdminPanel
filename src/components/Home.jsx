import { Grid, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { getTouristCount } from "../services/users.service";
import { getTypesCount } from "../services/typeOfAttractions.service";
import AdminPanelHeader from "./AdminPanelHeader";
import ColoredCard from "./ColoredCard";
import "./components.styles/dynamicSlider.css";
const unsplashPhotos = [
  "https://images.unsplash.com/photo-1564180427732-bb0f33f84435?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=755&q=80",
  "https://images.unsplash.com/photo-1515386474292-47555758ef2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80",
  "https://images.unsplash.com/photo-1528657305805-d8d56cee1785?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=892&q=80",
  "https://images.unsplash.com/photo-1526994387180-9557a434b046?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1533813031913-6a764882db2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80",
  "https://images.unsplash.com/photo-1553522991-71439aa62779?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
];

const Home = (props) => {
  const [counts, setcounts] = useState({
    tourists: 0,
    posts: 120,
    reviews: 1977,
    types: 0,
  });
  useEffect(() => {
    const interval = setInterval(
      () =>
        setActivePhoto(
          unsplashPhotos[Math.floor(Math.random() * unsplashPhotos.length)]
        ),
      5000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(async () => {
    var touristCount = await getTouristCount();
    var typesCount = await getTypesCount();
    console.log("tourist count getted" + touristCount);
    setcounts({ ...counts, tourists: touristCount, types: typesCount });
  }, []);
  const [activePhoto, setActivePhoto] = useState(unsplashPhotos[0]);
  return (
    <div style={{ backgroundColor: "white" }}>
      <AdminPanelHeader user={props.user}>Accueil</AdminPanelHeader>
      <Paper
        style={{
          backgroundColor: "rgb(231 229 229 / 20%)",
          minHeight: `calc(100vh - 60px)`,
          borderTopLeftRadius: "40px",
          borderBottomLeftRadius: "40px",
          padding: "20px",
          paddingTop: "40px",
          boxShadow: "none",
        }}
        component="div"
      >
        <Grid container justify="center" style={{ marginTop: "10px" }}>
          <Grid container justify="center" direction="row" item sm={12}>
            <div className="sliderContainer">
              <img src={activePhoto}></img>
              <div className="sliderQuote">
                <span>
                  " Heureux le touriste qui a tout vu avant l'arrivée des
                  touristes ! "
                </span>
              </div>
            </div>
          </Grid>
          <Grid
            container
            item
            sm={12}
            spacing={3}
            style={{ marginTop: "10px" }}
          >
            <Grid item xs={12} sm={6} md>
              {" "}
              <ColoredCard color="#17a2b8" number={counts.tourists}>
                Touristes
              </ColoredCard>
            </Grid>
            <Grid item xs={12} sm={6} md>
              {" "}
              <ColoredCard color="#ffc107" number={counts.posts}>
                Posts
              </ColoredCard>
            </Grid>
            <Grid item xs={12} sm={6} md>
              {" "}
              <ColoredCard color="#dc3545" number={counts.reviews}>
                Commentaires
              </ColoredCard>
            </Grid>
            <Grid item xs={12} sm={6} md>
              {" "}
              <ColoredCard color="#28a745" number={counts.types}>
                Types
              </ColoredCard>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Home;
