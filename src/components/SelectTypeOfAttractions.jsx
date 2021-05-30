import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Grid } from "@material-ui/core";
import { getAllTypes } from "../services/typeOfAttractions.service";
const SelectTypeOfAttractions = (props) => {
  const [data, setdata] = React.useState([]);
  const [typeSelected, setTypeSelected] = React.useState();
  React.useEffect(async () => {
    const vdata = await getAllTypes();
    setdata(vdata);
  }, []);
  const handleChangeSelect = (event) => {
    setTypeSelected(event.target.value);
    props.setType(event.target.value);
  };
  const SingleParentType = (parentType, index) => (
    <optgroup
      style={{ color: "teal" }}
      key={index}
      label={`${parentType.type} :`}
    >
      {parentType.childrenTypes.map((childType) => (
        <option
          style={{ color: "black" }}
          key={`${childType.type}_${childType.id}`}
          value={childType.id}
        >
          {childType.type}
        </option>
      ))}
    </optgroup>
  );
  return (
    <Grid container justify="flex-end">
      <Grid item={12}>
        {data && (
          <FormControl style={{ minWidth: "220px" }}>
            <InputLabel htmlFor="grouped-select">Type d'attractions</InputLabel>
            <Select
              native
              id="grouped-select"
              value={typeSelected}
              onChange={handleChangeSelect}
            >
              <option aria-label="None" value="" />
              {data &&
                data.map((parent, index) => {
                  return SingleParentType(parent);
                })}
            </Select>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

export default SelectTypeOfAttractions;
