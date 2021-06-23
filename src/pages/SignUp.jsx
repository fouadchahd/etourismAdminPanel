import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { registerAdmin } from "../services/register.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  ThemeProvider,
  Button,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core";
import leithsolution_logo from "../asserts/leithsolution_logo.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  progressStyle: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
}));
const SignUp = () => {
  const [errors, setErrors] = useState({});
  const [showPassword, setshowPassword] = useState(false);
  const [state, setstate] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const history = useHistory();
  const registerHandler = async (e) => {
    e.preventDefault();
    var { firstName, lastName, email, password } = { ...state };
    setisLoading(true);
    setErrors({});
    await registerAdmin(firstName, lastName, email, password)
      .then(({ data }) => {
        history.push({
          pathname: "/login",
          state: {
            email,
            password,
          },
        });
        setisLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          var objects = error.response.data.violations.reduce(
            (obj, item) =>
              Object.assign(obj, { [item.propertyPath]: item.message }),
            {}
          );
          setErrors(objects);
          setisLoading(false);
        }
      });
  };
  const onChangeHandler = (e) => {
    e.preventDefault();
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: "#3d4b57" },
    },
  });
  return (
    <div className="outer">
      <header className={"header"}>
        <img
          className={"headerLogo"}
          src={leithsolution_logo}
          alt="leithsolution_logo"
        />
      </header>
      <div className="formHeader">
        <h3 className="formHeaderTitle"> S'inscrire </h3>
      </div>

      <div className="inner">
        <form onSubmit={(e) => registerHandler(e)}>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <TextField
                error={Boolean(errors?.firstName)}
                helperText={errors?.firstName ? errors.firstName : ""}
                type="text"
                value={state.firstName}
                onChange={onChangeHandler}
                name="firstName"
                fullWidth
                required
                label="Prenom"
              />
            </Grid>
            <Grid item>
              <TextField
                error={errors?.lastName}
                helperText={errors?.lastName ? errors.lastName : ""}
                type="text"
                value={state.lastName}
                onChange={onChangeHandler}
                name="lastName"
                fullWidth
                required
                label="Nom de famille"
              />
            </Grid>
            <Grid item>
              <TextField
                error={Boolean(errors?.email)}
                helperText={errors?.email ? errors.email : ""}
                type="email"
                value={state.email}
                onChange={onChangeHandler}
                name="email"
                fullWidth
                required
                label="Adresse e-mail"
              />
            </Grid>
            <Grid item>
              <TextField
                error={errors?.password}
                helperText={errors?.password ? errors.password : ""}
                value={state.password}
                onChange={onChangeHandler}
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                label="Choisissez un mot de passe"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <ThemeProvider theme={theme}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      size={24}
                      className={classes.progressStyle}
                    />
                  ) : (
                    `S'inscrire`
                  )}
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>

          <p className="forgot-password text-right">
            Vous avez déjà un compte? <Link to="/login"> S'identifier</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
