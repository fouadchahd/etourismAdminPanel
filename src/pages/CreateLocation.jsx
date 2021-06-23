import { Button, Grid, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AdminPanelHeader from "../components/AdminPanelHeader";
import Maps from "../components/Maps2";
import SelectTypeOfAttractions from "../components/SelectTypeOfAttractions";
import Tab from "@material-ui/core/Tab";
import { fade, makeStyles } from "@material-ui/core/styles";
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
import { insertPoi, getPoisByName } from "../services/pois.service";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DoneIcon from "@material-ui/icons/Done";
import { storage } from "../firebase";
import { useHistory } from "react-router";

import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import noImageAvailable from "../asserts/no-image-icon-23485.png";
function DialogUploadLoading(props) {
  const history = useHistory();
  const { onClose, open, ...other } = props;
  const handleCancel = () => {
    onClose();
    history.push("/");
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Traitement en cours ...
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          item
          xs={12}
          justify={"center"}
          direction={"column"}
          spacing={2}
        >
          <Grid
            container
            item
            xs={12}
            direction={"row"}
            spacing={1}
            alignItems="center"
          >
            {props.uploadImagesIsLoading ? (
              <>
                <CircularProgress thickness={2} size={15} color="primary" />
                <p
                  style={{
                    marginBottom: "0px",
                    marginLeft: "8px",
                    color: "#7f8c8d",
                  }}
                >
                  Chargement des images en cours
                </p>
              </>
            ) : (
              <>
                <DoneIcon
                  thickness={2}
                  size={15}
                  style={{ color: "#27ae60" }}
                />
                <p
                  style={{
                    marginLeft: "8px",
                    marginBottom: "0px",
                    color: "#05c46b",
                  }}
                >
                  Images chargées
                </p>
              </>
            )}
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction={"row"}
            spacing={1}
            alignItems="center"
          >
            {true &&
              !props.uploadImagesIsLoading &&
              props.uploadAudioIsLoading && (
                <>
                  <CircularProgress thickness={2} size={15} color="primary" />
                  <p
                    style={{
                      marginBottom: "0px",
                      marginLeft: "8px",
                      color: "#7f8c8d",
                    }}
                  >
                    Chargement des audios en cours
                  </p>
                </>
              )}
            {!props.uploadImagesIsLoading && !props.uploadAudioIsLoading && (
              <>
                <DoneIcon
                  thickness={2}
                  size={15}
                  style={{ color: "#27ae60" }}
                />
                <p
                  style={{
                    marginBottom: "0px",
                    marginLeft: "8px",
                    color: "#05c46b",
                  }}
                >
                  Audios chargées
                </p>
              </>
            )}
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction={"row"}
            spacing={1}
            alignItems="center"
          >
            {!props.uploadImagesIsLoading & !props.uploadAudiosIsLoading &&
              props.uploadPoiToServerIsLoading && (
                <>
                  <CircularProgress thickness={2} size={15} color="primary" />
                  <p
                    style={{
                      marginBottom: "0px",
                      marginLeft: "8px",
                      color: "#7f8c8d",
                    }}
                  >
                    Veuillez patienter ...
                  </p>
                </>
              )}
            {/*(
              <>
                <DoneIcon
                  thickness={2}
                  size={15}
                  style={{ color: "#27ae60" }}
                />
                <p
                  style={{
                    marginBottom: "0px",
                    marginLeft: "8px",
                    color: "#27ae60",
                    fontWeight: "bold",
                  }}
                >
                  Chargement réussi
                </p>
              </>
                )*/}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="secondary">
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function DialogToFillPoiChildren(props) {
  const { open, closeDialog, updateParent, ...other } = props;
  const [pois, setpois] = useState([]);
  const [nameOfPoiTaped, setNameOfPoiTaped] = useState("");
  const changeNameOfPoi = (e) => {
    setNameOfPoiTaped(e.target.value);
  };
  useEffect(async () => {
    await getPoisByName(nameOfPoiTaped, 4).then(({ data }) => {
      setpois(data);
    });
  }, [nameOfPoiTaped]);
  const classes = useStyles();
  const [poiHovred, setpoiHovred] = useState(false);
  const [hovredId, sethovredId] = useState(null);
  const onMouseEnterIsHovred = (e) => {
    sethovredId(e.target.id);
    setpoiHovred(true);
  };
  const onMouseLeaveIsHovred = (e) => {
    sethovredId(0);
    setpoiHovred(false);
  };
  const pickParent = (poi) => {
    updateParent({ id: poi.id, name: poi.name });
    closeDialog();
  };
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">
        Localiser au sein d'un monument
      </DialogTitle>
      <DialogContent dividers>
        <Grid container justify={"center"} direction={"column"} spacing={2}>
          <Grid item xs={12}>
            <div className={classes.search}>
              <div className={classes.searchIcon} onkey>
                <SearchIcon />
              </div>
              <InputBase
                onChange={changeNameOfPoi}
                value={nameOfPoiTaped}
                placeholder="Recherche..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <FormControl fullWidth style={{ marginTop: "8px" }}>
              <Grid container direction={"column"} style={{ padding: "0px" }}>
                {pois &&
                  pois.map((poi) => (
                    <Grid
                      key={poi.id}
                      onMouseEnter={onMouseEnterIsHovred}
                      onMouseLeave={onMouseLeaveIsHovred}
                      container
                      item
                      xs={12}
                      direction={"row"}
                      wrap="nowrap"
                      style={{
                        borderBottom: "1px solid #ced6e0",
                        paddingBottom: "8px",
                        paddingTop: "8px",
                        backgroundColor:
                          poiHovred & (hovredId == poi.id)
                            ? "#7bed9f1f"
                            : "white",
                      }}
                    >
                      <Grid
                        item
                        style={{
                          width: "60px",
                          height: "60px",
                          marginLeft: "6px",
                        }}
                      >
                        <>
                          {poi.photo.length === 0 ? (
                            <span
                              style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#f5f6fa",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src={noImageAvailable}
                                width={50}
                                height={50}
                              />
                            </span>
                          ) : (
                            <img
                              src={poi.photo[0].url}
                              width={60}
                              height={60}
                            />
                          )}
                        </>
                      </Grid>
                      <Grid
                        id={poi.id}
                        onClick={() => pickParent(poi)}
                        container
                        item
                        zeroMinWidth
                        style={{ marginLeft: "9px" }}
                        direction="column"
                        justify="center"
                      >
                        <Typography noWrap variant="h6">
                          {poi.name}
                        </Typography>
                        <Typography
                          noWrap
                          variant="body2"
                          style={{ color: "#01a3a4" }}
                        >
                          {poi.typeOfAttraction.type}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
const useStyles = makeStyles((theme) => ({
  poiItem: {
    backgroundColor: fade("#ff6b6b", 0.15),
    "&:hover": {
      backgroundColor: fade("#ff6b6b", 0.25),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#7bed9f", 0.15),
    "&:hover": {
      backgroundColor: fade("#7bed9f", 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: "absolute",
  },
}));
const CreateLocation = (props) => {
  const classes = useStyles();
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
  const [address, setAddress] = useState({
    formattedAddress: "",
    latitude: "",
    longitude: "",
    city: {
      id: "",
    },
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert2, setOpenAlert2] = useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [openChooseParentDialog, setOpenChooseParentDialog] = useState(false);
  const [parent, setParent] = useState(null);
  const openChoosePArentDialog = () => {
    setOpenChooseParentDialog(true);
  };
  const closeChoosePArentDialog = () => {
    setOpenChooseParentDialog(false);
  };
  const closeAlert = () => {
    setOpenAlert(false);
  };
  const closeAlert2 = () => {
    setOpenAlert2(false);
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
    window.scrollTo(0, 1000);
  };
  const scrollTop = () => {
    window.scrollTo(0, 0);
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
      !address ||
      !address.longitude ||
      !address.latitude ||
      !address.formattedAddress ||
      !address.city ||
      !address.city.id
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
      setuploadPoiIsLoading(false);
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
          setOpenAlert2(true);
          console.log("error " + error);
          setuploadPoiIsLoading(false);
        },
        () => {
          storage
            .ref("poiPhotos")
            .child(`${now.getTime()}_${file.name}`)
            .getDownloadURL()
            .then((url) => {
              photosUrl.push({ url: url, alt: file.name });
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
          setOpenAlert2(true);
          console.log("error() " + error);
          setuploadPoiIsLoading(false);
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
      parent: parent === null ? null : `/api/pois/${parent.id}`,
      audio: audiosUrl,
      photo: photosUrl,
      address,
    };
    console.log("TO SERVER.....", vPoi);
    insertPoi(vPoi)
      .then(({ data }) => {
        console.log("POI INSERTED", data);
        setuploadPoiToServerIsLoading(false);
        setuploadPoiIsLoading(false);
        cleanState();
      })
      .catch((err) => {
        console.log("ERROR OCCUR WHILE INSERTING NEW POI ,TRY LATER!", err);
        setuploadPoiIsLoading(false);
        setOpenAlert2(true);
      });
  };
  const cleanState = () => {
    setTypeSelected(null);
    setAddress(null);
    setAudioFiles([]);
    setPictureFiles([]);
    setParent(null);
    setPoiName("");
    setDescriptions([]);
    setOpenSuccessAlert(true);
    setInterval(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <div style={{ backgroundColor: "#ffff" }}>
      <DialogUploadLoading
        keepMounted
        open={uploadPoiIsLoading}
        onClose={handleCloseDialogUploadLoading}
        uploadAudioIsLoading={uploadAudioIsLoading}
        uploadImagesIsLoading={uploadImagesIsLoading}
        uploadPoiToServerIsLoading={uploadPoiToServerIsLoading}
      />
      <DialogToFillPoiChildren
        keepMounted
        open={openChooseParentDialog}
        updateParent={setParent}
        closeDialog={closeChoosePArentDialog}
      />
      <Backdrop style={{ zIndex: "1201", color: "#fff" }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openSuccessAlert}
        autoHideDuration={4000}
      >
        <Alert severity="success">
          {<p>Votre centre d'intérêt a été partagé</p>}
        </Alert>
      </Snackbar>
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openAlert2}
        autoHideDuration={4000}
        onClose={closeAlert2}
      >
        <Alert onClose={closeAlert2} severity="error">
          <p>{"Une erreur s'est produite , veuillez reéssayer plus tard"}</p>
        </Alert>
      </Snackbar>
      <AdminPanelHeader>Créer un nouveau lieu</AdminPanelHeader>
      {availableLangages && availableLangages.length > 0 && (
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
                  onClick={scrollTop}
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
                    {uploadPoiIsLoading ? "Chargement..." : "Poster"}{" "}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      )}

      <Fab
        variant="extended"
        style={{
          color: "teal",
          borderRadius: "5px",
          position: "absolute",
          top: "50%",
          right: "10px",
        }}
        classeName={classes.fab}
        onClick={openChoosePArentDialog}
      >
        <NavigationIcon className={classes.extendedIcon} />
        {parent === null ? "Localiser" : parent.name}
      </Fab>
    </div>
  );
};

export default CreateLocation;
