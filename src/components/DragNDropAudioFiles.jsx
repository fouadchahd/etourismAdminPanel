import React, { useState } from "react";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import List from "@material-ui/core/List";
import { Grid } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import DeleteIcon from "@material-ui/icons/Delete";
import { red, orange } from "@material-ui/core/colors";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
const DragNDropAudioFiles = (props) => {
  const availableLangages = props.languages;
  const [languageSelected, setlanguageSelected] = useState(null);
  const [fileSelected, setfileSelected] = useState(null);
  const secondary = true;
  const [open, setOpen] = useState(false);
  const [audioFiles, setaudioFiles] = useState([...props.audioFiles]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    setlanguageSelected(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAudioFileSubmited = (e) => {
    if (languageSelected && fileSelected) {
      let lang_name = "";
      for (var l = 0; l < availableLangages.length; l++) {
        if (availableLangages[l].id == languageSelected) {
          lang_name = availableLangages[l].name;
          break;
        }
      }
      if (lang_name.length > 0) {
        var [vAudioFileMatchLang, ...rest] = audioFiles.filter(
          (file) => file.languages.id == languageSelected
        );
        if (!vAudioFileMatchLang) {
          var varray = [
            ...audioFiles,
            {
              audioFile: fileSelected,
              languages: {
                id: languageSelected,
                name: lang_name,
              },
            },
          ];
          setaudioFiles([...varray]);
          props.updateAudios([...varray]);
        } else {
          let index = audioFiles.indexOf(vAudioFileMatchLang);
          console.log("indexOF MATCHED audio ", index);
          vAudioFileMatchLang.audioFile = fileSelected;
          audioFiles[index] = {
            audioFile: fileSelected,
            languages: {
              id: languageSelected,
              name: lang_name,
            },
          };
          setaudioFiles([...audioFiles]);
          props.updateAudios([...audioFiles]);
        }
      }
    }
    handleClose();
  };
  const deleteAudioFile = (file) => {
    const audios = [...audioFiles];
    var index = audios.indexOf(file);
    if (index !== -1) {
      audios.splice(index, 1);
      setaudioFiles(audios);
      props.updateAudios(audios);
    }
  };
  const FileUploadedHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("fileChosen ", file);
      setfileSelected(file);
    }
  };
  const audioFileDialogUi = (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choisissez toujours la bonne description"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aidez les touristes à savoir plus d'information sur ce lieu
          </DialogContentText>
          <Grid container direction={"column"} spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Langue</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={languageSelected}
                  onChange={handleChange}
                  fullWidth
                >
                  {availableLangages &&
                    availableLangages.map((lang, index) => (
                      <MenuItem key={index} value={lang.id}>
                        {lang.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {" "}
              <input
                type="file"
                required
                onChange={FileUploadedHandler}
                accept="audio/*"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleAudioFileSubmited} color="primary" autoFocus>
            Continuer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  const audioUi = (file) => (
    <ListItem key={file.audioFile.name + Math.random()}>
      <ListItemAvatar>
        <Avatar style={{ backgroundColor: red[900] }}>
          <GraphicEqIcon style={{ color: orange[500] }} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={file.audioFile.name}
        secondary={secondary ? file.languages.name : null}
        style={{
          color: "green",
          fontSize: "10px",
          overflowX: "hidden",
          marginTop: "0px",
          marginBottom: "0px",
        }}
      />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => deleteAudioFile(file)}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon style={{ color: red[400] }} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
  return (
    <Grid
      container
      direction="column"
      style={{
        Height: "250px",
        border: "1px solid #b2bec3",
        zIndex: "100",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      }}
    >
      <Grid item xs={12}>
        <div
          className={"sectionAudioHeader"}
          style={{
            backgroundColor: "#00b894",
            color: "#2d3436",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Fichiers audio</span>
          <span onClick={handleClickOpen}>
            <AddCircleRoundedIcon></AddCircleRoundedIcon>
          </span>
        </div>
        <div
          className={"sectionAudioBody"}
          style={{
            overflowY: "overlay",
            height: "201px",
          }}
        >
          <div>
            <List dense={false}>{audioFiles.map((file) => audioUi(file))}</List>
          </div>
        </div>
      </Grid>
      {audioFileDialogUi}
    </Grid>
  );
};

export default DragNDropAudioFiles;
