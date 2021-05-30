import React from "react";
import DragNDropPictureFiles from "../components/DragNDropPictureFiles";
import { Grid } from "@material-ui/core";
import DragNDropAudioFiles from "./DragNDropAudioFiles";

const CreateLocationMediaTab = (props) => {
  //props.language
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9} classe={"picturesWrapper"}>
          <DragNDropPictureFiles
            pictureFiles={props.pictureFiles}
            updatePictures={props.updatePictures}
          ></DragNDropPictureFiles>
        </Grid>
        <Grid item xs={12} md={4} lg={3} classe={"filesWrapper"}>
          <DragNDropAudioFiles
            languages={props.languages}
            audioFiles={props.audioFiles}
            updateAudios={props.updateAudios}
          ></DragNDropAudioFiles>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default CreateLocationMediaTab;
