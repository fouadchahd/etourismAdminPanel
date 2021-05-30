import React, { useState } from "react";
import { storage } from "../firebase";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import leithsolution_logo from "../asserts/leithsolution_logo.png";
import DragNDropPictureFiles from "../components/DragNDropPictureFiles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: " 0 40px",
    display: "flex",
    alignContent: "center",
    background: "transparent",
  },
  container: {
    alignSelf: "center",
  },
  wrapper: {
    width: "100%",
    display: "block",
  },
  header: {
    background: "radial-gradient(circle, #3d4b57 12%, #000000)",
    background: "-webkit-radial-gradient(circle, #3d4b57 12%, #000000)",
    height: "64px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerLogo: {
    marginLeft: "10%",
    width: "150px",
    height: "36px",
  },
  content: {
    background: "#fff",
    padding: "40px 40px",
  },
  title: {
    [theme.breakpoints.down()]: {},
  },
}));
/////////////////////////////////////////

const Home = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(10);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const vprogress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(vprogress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <img
          className={classes.headerLogo}
          src={leithsolution_logo}
          alt="leithsolution_logo"
        />
      </header>
      <Grid container>
        <Grid item xs={12}>
          <div>
            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            {url}
            <br />
            <img
              src={url || "http://via.placeholder.com/300"}
              alt="randomePictures"
            />
          </div>
          )
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <DragNDropPictureFiles />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
