import React, { useState } from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import { green } from "@material-ui/core/colors";
import { AddCircleOutline } from "@material-ui/icons";

const CreateLocationDescriptionsTab2 = (props) => {
  const availableLangages = props.languages;
  const [checkedItems, setcheckedItems] = useState([]);
  console.log("start " + JSON.stringify(checkedItems));

  const [languageSelected, setlanguageSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //   functions
  // insert description
  const addNewDesc = (content, lang_id) => {
    console.log("ADD NEW DESC");
    let lang_name = "";
    for (var l = 0; l < availableLangages.length; l++) {
      if (availableLangages[l].id == lang_id) {
        lang_name = availableLangages[l].name;
        break;
      }
    }

    if (lang_name.length > 0) {
      if (content.length > 0) {
        var [vDescMatchLang, ...rest] = props.pdescriptions.filter(
          (desc) => desc.languages.id == lang_id
        );
        var varray = [];
        if (!vDescMatchLang) {
          varray = [
            ...props.pdescriptions,
            {
              content: content,
              languages: {
                id: lang_id,
                name: lang_name,
              },
            },
          ];
          props.updateDescriptions([...varray]);
        } else {
          let index = props.pdescriptions.indexOf(vDescMatchLang);
          console.log("indexOF mATCHED DESC ", index);
          vDescMatchLang.content = content;
          props.pdescriptions[index] = {
            content: content,
            languages: {
              id: lang_id,
              name: lang_name,
            },
          };
          props.updateDescriptions([...props.pdescriptions]);
        }
      }
    }
    console.log("pdescription ", props.pdescriptions);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const changeCheckBoxState = (event) => {
    if (checkedItems.indexOf(event.target.value) == -1) {
      setcheckedItems([...checkedItems, event.target.value]);
    } else {
      let carray = [...checkedItems];
      carray.splice(checkedItems.indexOf(event.target.value), 1);
      setcheckedItems(carray);
    }
  };
  const deleteCheckedItems = () => {
    let varray = [...props.pdescriptions];
    let a = null; //pour regulariser le fais qu'apres la suppression du 1er element la select choisi l'element apres ppour etre checked
    for (var i = 0; i < checkedItems.length; i++) {
      varray.splice(+checkedItems[i], 1);
      if (checkedItems[i] == "0") {
        a = "0";
      }
    }
    a == "0" ? setcheckedItems([a]) : setcheckedItems([]);

    props.updateDescriptions(varray);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setlanguageSelected(event.target.value);
  };
  const [descTyping, setdescTyping] = useState("");
  const userTypingDescription = (event) => {
    setdescTyping(event.target.value);
  };
  const handleDescSubmited = () => {
    console.log("languageSelected " + languageSelected);
    console.log("descTyping " + descTyping);
    addNewDesc(descTyping, languageSelected);
    handleClose();
  };

  const addDescriptionDialog = (
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
              <TextField
                fullWidth
                multiline
                id="outlined-textarea"
                variant="outlined"
                placeholder={"écrivez içi ..."}
                required
                minHeight={"250px"}
                onChange={userTypingDescription}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDescSubmited} color="primary" autoFocus>
            Continuer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  const emptyDescriptionArea = (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "250px", backgroundColor: "#f5f6fa" }}
    >
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h4">Pas de description pour le moment</Typography>
        <Typography variant="body1" style={{ marginTop: "3px" }}>
          Cliquer çi-dessous pour ajouter une !
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          style={{ borderColor: "teal", marginTop: "8px" }}
        >
          <Typography variant="body2">
            <font color="teal">Nouvelle description</font>
          </Typography>
        </Button>
        {addDescriptionDialog}
      </Grid>
    </Grid>
  );
  const fillAvailableDescriptions = (
    <Grid
      container
      style={{
        minHeight: "250px",
        backgroundColor: "#f5f6fa",
        padding: "14px",
      }}
      justify={"space-between"}
    >
      <Grid item xs={1}>
        <Button
          variant="contained"
          color="secondary"
          style={{ padding: "10px 10px" }}
          onClick={deleteCheckedItems}
        >
          <DeleteIcon style={{ color: red[50] }}></DeleteIcon>
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          style={{ padding: "10px 10px", marginTop: "10px" }}
        >
          <AddCircleOutline style={{ color: green[50] }}></AddCircleOutline>
        </Button>
      </Grid>{" "}
      <Grid container item xs={11} spacing={1}>
        {props.pdescriptions &&
          props.pdescriptions.map((item, index) => {
            return (
              item.content && (
                <Grid key={index} item xs={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <Grid container direction="row">
                        <Grid item>
                          <input
                            type="checkbox"
                            key={index}
                            value={index}
                            onChange={(event) => changeCheckBoxState(event)}
                          />
                          {item.languages.name}
                        </Grid>
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography color="textSecondary">
                        {item.content}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              )
            );
          })}
      </Grid>
      {addDescriptionDialog}
    </Grid>
  );
  return (
    <div>
      {props.pdescriptions.length == 0
        ? emptyDescriptionArea
        : fillAvailableDescriptions}
    </div>
  );
};

export default CreateLocationDescriptionsTab2;
