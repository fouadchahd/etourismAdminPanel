import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AdminPanelHeader from "../components/AdminPanelHeader";
import Maps from "../components/Maps2";
import SelectTypeOfAttractions from "../components/SelectTypeOfAttractions";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@material-ui/core/Snackbar";

import TabPanel from "@material-ui/lab/TabPanel";
import CreateLocationDescriptionsTab from "../components/CreateLocationDescriptionsTab";
import CreateLocationMediaTab from "../components/CreateLocationMediaTab";
import Alert from "../components/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getAllLanguage } from "../services/languages.service";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { storage } from "../firebase";
function DialogUploadLoading(props) {
  const { onClose, open, ...other } = props;
  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Traitement en cours ...
      </DialogTitle>
      <DialogContent dividers>
        <Grid item xs={12}>
          <Typography variant="body2" color="primary">
            {props.uploadImagesIsLoading
              ? "(1)Uploading..."
              : "Images uploaded to CLoud"}
          </Typography>
          <Typography variant="body2" color="primary">
            {props.uploadAudioIsLoading
              ? "(2)Uploading..."
              : "Audio uploaded to CLoud"}
          </Typography>
          <Typography variant="body2" color="primary">
            {props.uploadPoiToServerIsLoading
              ? "(3)Uploading..."
              : "Poi uploaded to Server"}
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
const CreateLocation = (props) => {
  var photosUrl = [];
  var audiosUrl = [];
  const [errors, setErrors] = useState([]);
  const [availableLangages, setAvailableLangages] = React.useState([]);
  const [tabValue, setTabValue] = React.useState("description");
  const [isLoading, setIsloading] = React.useState(false);
  const [poiName, setPoiName] = useState("");
  const [typeSelected, setTypeSelected] = useState(null);
  const [descriptions, setDescriptions] = React.useState([]);
  const [pictureFiles, setPictureFiles] = React.useState([]);
  const [audioFiles, setAudioFiles] = useState([]);
  const [uploadAudioIsLoading, setuploadAudioIsLoading] = useState(false);
  const [uploadImagesIsLoading, setuploadImagesIsLoading] = useState(false);
  const [uploadPoiToServerIsLoading, setuploadPoiToServerIsLoading] =
    useState(false);
  const [uploadPoiIsLoading, setuploadPoiIsLoading] = useState(false);
  const [openDialogUploadLoading, setOpenDialogUploadLoading] = useState(false);
  const [address, setAddress] = useState({
    formattedAddress: "",
    latitude: "",
    longitude: "",
    city: {
      id: "",
    },
  });
  const [openAlert, setOpenAlert] = useState(false);
  const closeAlert = () => {
    setOpenAlert(false);
  };
  const openAlertHandler = () => {
    setOpenAlert(true);
  };
  const handleCloseDialogUploadLoading = () => {
    setuploadPoiIsLoading(false);
  };

  React.useEffect(async () => {
    setIsloading(true);
    const vAvailLang = await getAllLanguage();
    setAvailableLangages(vAvailLang);
    setIsloading(false);
  }, []);

  const poiNameChanged = (event) => {
    setPoiName(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const submitPoi = () => {
    let vErrors = [];
    setuploadPoiIsLoading(true);
    if (poiName.length < 1) {
      vErrors.push("Veuillez entrer un nom valide pour attirer l'intention");
    }
    if (typeSelected == null) {
      vErrors.push("Veuillez choisir un type d'attraction ");
    }
    if (
      address &&
      address.longitude &&
      address.latitude &&
      address.formattedAddress &&
      address.city &&
      address.city.id
    ) {
      vErrors.push("L'adresse choisi n'est pas valide ");
    }
    if (descriptions.length === 0) {
      vErrors.push(
        "Les descriptions vont aider les touristes a bien découvrir le lieu, Veuillez entrer au minimun une"
      );
    }
    if (vErrors.length === 0) {
      //Create some warning if there s no Image or Audio
      let vPhotosWithBlop = pictureFiles;
      handleUploadMupltipleImageFiles(vPhotosWithBlop);
    } else {
      setErrors([...vErrors]);
      openAlertHandler();
    }
  };

  const handleUploadMupltipleImageFiles = async (vPhotosWithBlop) => {
    setuploadImagesIsLoading(true);
    photosUrl = [];
    vPhotosWithBlop.length > 0 &&
      (await vPhotosWithBlop.forEach(async (file) => {
        handleUploadSingleImageFile(file);
      }));
    if (vPhotosWithBlop.length === 0) {
      setuploadImagesIsLoading(false);
      handleUploadMupltipleAudioFiles(audioFiles);
    }
  };
  const handleUploadSingleImageFile = async (file) => {
    const blob = await fetch(file.preview).then((r) => r.blob());
    var now = new Date();
    if (blob) {
      const uploadTask = storage
        .ref(`poiPhotos/${now.getTime()}_${file.name}`)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("Photo progress " + progress);
        },
        (error) => {
          console.log("error " + error);
        },
        () => {
          storage
            .ref("poiPhotos")
            .child(`${now.getTime()}_${file.name}`)
            .getDownloadURL()
            .then((url) => {
              photosUrl.push(url);
              if (photosUrl.length === pictureFiles.length) {
                setuploadImagesIsLoading(false);
                handleUploadMupltipleAudioFiles(audioFiles);
              }
            });
        }
      );
    }
  };
  const handleUploadMupltipleAudioFiles = (audios) => {
    setuploadAudioIsLoading(true);
    audiosUrl = [];
    audios.length > 0 &&
      audios.forEach(async (audio) => {
        uploadSingleAudio(audio);
      });
    if (audios.length === 0) {
      console.log("No Audio File found");
      setuploadAudioIsLoading(false);
      handleUploadPoiToServer();
    }
  };
  const uploadSingleAudio = (audio) => {
    if (audio) {
      var now = new Date();
      const uploadTask = storage
        .ref(
          `poiAudios/#${
            audio.languages.name
          }_${now.getTime()}_${audio.audioFile.name.replaceAll(" ", "_")}`
        )
        .put(audio.audioFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("audio progress " + progress);
        },
        (error) => {
          console.log("error " + error);
        },
        () => {
          storage
            .ref("poiAudios")
            .child(
              `#${
                audio.languages.name
              }_${now.getTime()}_${audio.audioFile.name.replaceAll(" ", "_")}`
            )
            .getDownloadURL()
            .then((url) => {
              audiosUrl.push({
                url: url,
                language: {
                  id: audio.languages.id,
                },
              });
              if (audiosUrl.length === audioFiles.length) {
                setuploadAudioIsLoading(false);
                handleUploadPoiToServer();
              }
            });
        }
      );
    }
  };
  const handleUploadPoiToServer = async () => {
    setuploadPoiToServerIsLoading(true);
    let typeOfAttraction = { id: typeSelected };
    let name = poiName;
    let description = descriptions.map((desc) => {
      return { content: desc.content, language: { id: desc.languages.id } };
    });
    var vPoi = {
      name,
      description,
      typeOfAttraction,
      parent: null,
      audio: audiosUrl,
      photo: photosUrl,
      address,
    };
    console.log("TO SERVER.....", vPoi);
    setuploadPoiToServerIsLoading(false);
    setuploadPoiIsLoading(false);
    cleanState();
  };
  const cleanState = () => {
    setTypeSelected(null);
    setAddress(null);
    setAudioFiles([]);
    setPictureFiles([]);
    setPoiName("");
    setDescriptions([]);
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <Backdrop style={{ zIndex: "1201", color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={9000}
        onClose={closeAlert}
      >
        <Alert onClose={closeAlert} severity="error">
          {errors && errors.map((error, index) => <p key={index}>{error}</p>)}
        </Alert>
      </Snackbar>
      <AdminPanelHeader>Créer un nouveau lieu</AdminPanelHeader>
      {!isLoading && (
        <Grid
          container
          justify="center"
          style={{ minHeight: `calc(100vh - 60px)`, paddingTop: "20px" }}
        >
          <Grid item xs={10} spacing={3}>
            <Grid container justify="space-between">
              <Grid item xs={12} md={5}>
                <TextField
                  onChange={poiNameChanged}
                  value={poiName}
                  placeholder="Taper le nom de ce lieu"
                  required
                  label="Nom du lieu"
                  fullWidth
                  style={{ marginBottom: "20px" }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <SelectTypeOfAttractions
                  setType={setTypeSelected}
                ></SelectTypeOfAttractions>
              </Grid>
            </Grid>

            <div
              classeName="mapContainer"
              style={{ borderRadius: "10px", overflow: "hidden" }}
            >
              <Maps
                google={props.google}
                center={{ lat: 33.9862945373425, lng: -6.85294615660331 }}
                height="300px"
                zoom={10}
                pickLocation={setAddress}
              />
              {availableLangages && availableLangages.length > 0 && (
                <Grid container>
                  <Grid item xs={12}>
                    <div className="TabsContainer">
                      <TabContext value={tabValue}>
                        <TabList
                          onChange={handleChange}
                          indicatorColor={"primary"}
                        >
                          <Tab
                            label="Descriptions"
                            value="description"
                            className={"tabHeaderSingleItem"}
                          />
                          <Tab
                            label="Media"
                            value="media"
                            className={"tabHeaderSingleItem"}
                          />
                        </TabList>
                        <TabPanel value="description" style={{ padding: 0 }}>
                          <CreateLocationDescriptionsTab
                            languages={availableLangages}
                            pdescriptions={descriptions}
                            updateDescriptions={setDescriptions}
                          ></CreateLocationDescriptionsTab>
                        </TabPanel>
                        <TabPanel value="media" style={{ padding: 0 }}>
                          <CreateLocationMediaTab
                            languages={availableLangages}
                            pictureFiles={pictureFiles}
                            updatePictures={setPictureFiles}
                            audioFiles={audioFiles}
                            updateAudios={setAudioFiles}
                          ></CreateLocationMediaTab>
                        </TabPanel>
                      </TabContext>
                    </div>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    style={{
                      width: "100%",
                      backgroundColor: "#00b894",
                    }}
                    onClick={submitPoi}
                  >
                    Poster
                  </Button>
                </Grid>
                {uploadPoiIsLoading && (
                  <DialogUploadLoading
                    keepMounted
                    open={openDialogUploadLoading}
                    onClose={handleCloseDialogUploadLoading}
                    uploadAudioIsLoading={uploadAudioIsLoading}
                    uploadImagesIsLoading={uploadImagesIsLoading}
                    uploadPoiToServerIsLoading={uploadPoiToServerIsLoading}
                  />
                )}{" "}
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default CreateLocation;
