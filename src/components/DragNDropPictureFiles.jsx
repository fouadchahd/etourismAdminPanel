import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Grid,
  GridList,
  Typography,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  marginTop: "16px",
  marginLeft: "5px",
  paddingLeft: "5px",
  overflow: "hidden",
};
const thumb = {
  display: "flex",
  justifyContent: "flex-start",
  borderRadius: 2,
  border: "1px dashed lightblue",
  marginTop: "6px",
  marginBottom: 8,
  marginRight: 8,
  width: 80,
  height: 80,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: "71px",
  overflow: "hidden",
  position: "relative",
};
const img = {
  display: "block",
  justifyContent: "flex-start",
  width: "100%",
  height: "100%",
  borderRadius: "3px",
};
const gridList = {
  flexWrap: "nowrap",
  transform: "translateZ(0)",
};
const deleteImageBtn = {
  position: "absolute",
  right: "0px",
  top: "0px",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.7)",
  borderRadius: "50%",
};
const DragNDropPictureFiles = (props) => {
  const [files, setFiles] = useState(props.pictureFiles);
  const [uploading, setuploading] = useState(false);
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDrop: (acceptedFiles) => {
      props.updatePictures(
        files.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
      setFiles(
        files.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });

  //useEffect();
  /*() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]*/
  const deleteImg = (e, file) => {
    e.preventDefault();
    var array = [...files]; // make a separate copy of the array
    var index = array.indexOf(file);
    if (index !== -1) {
      array.splice(index, 1);
      setFiles(array);
      props.updatePictures(files);
    }
  };
  var alignImageBloc = files.length > 0 ? "flex-start" : "center";
  const thumbs = (
    <GridList style={gridList}>
      {files.map((file, index) => (
        <div style={thumb} key={file.name + "_" + index}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} />
            <HighlightOffIcon
              onClick={(e) => deleteImg(e, file)}
              style={deleteImageBtn}
            ></HighlightOffIcon>
          </div>
        </div>
      ))}
    </GridList>
  );
  return (
    <>
      <Grid container>
        <Grid item sm={12}>
          <div
            style={{
              minHeight: "250px",
              backgroundColor: "#f5f6fa",
              padding: "14px",
            }}
          >
            <section
              className="container"
              style={{
                marginTop: "60px",
              }}
            >
              <div className="dropzone" style={{ alignItems: alignImageBloc }}>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {files[0] ? (
                    <aside style={{ ...thumbsContainer }}>{thumbs}</aside>
                  ) : (
                    <Grid
                      container
                      item
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <Typography variant="h4">
                        Faites glisser et déposez quelques images ici,
                      </Typography>
                      <Typography variant="body1" style={{ marginTop: "3px" }}>
                        ou cliquez çi-dessous pour sélectionner des images !
                      </Typography>
                      <Button
                        onClick={open}
                        variant="outlined"
                        style={{ borderColor: "teal", marginTop: "8px" }}
                      >
                        <Typography variant="body2">
                          <font color="teal">Importer</font>
                        </Typography>
                      </Button>
                    </Grid>
                  )}
                </div>
              </div>
              {/*<Button
                size="large"
                color={uploading ? "default" : "primary"}
                variant="contained"
                onClick={handleUploadMupltipleFiles}
              >
                {uploading ? (
                  <CircularProgress thickness={4} size={27} color="primary" />
                ) : (
                  "Ajouter"
                )}{" "}
                </Button>*/}
            </section>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default DragNDropPictureFiles;
