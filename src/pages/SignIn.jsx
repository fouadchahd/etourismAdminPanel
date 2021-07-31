import React, { useContext, useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { login } from "../services/register.service";
import "../App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ErrorIcon from "@material-ui/icons/Error";
import leithsolution_logo from "../asserts/leithsolution_logo.png";
import { Button, CircularProgress, Grid, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Cookies from "js-cookie";
import AuthContext from "../context/AuthContext";

const SignIn = (props) => {
  const { authToken, setAuthToken } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [snackBarState, setsnackBarState] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setshowPassword] = useState(false);
  const [state, setstate] = useState(
    location.state && location.state.email && location.state.password
      ? {
          email: location.state.email,
          password: location.state.password,
        }
      : { email: "", password: "" }
  );
  const [isLoading, setisLoading] = useState(false);
  const loginHandler = () => {
    setError(null);
    setisLoading(true);
    login(state.email, state.password)
      .then(({ data }) => {
        if (data.data.roles.indexOf("ROLE_ADMIN") < -1) {
          setError("L'espace touriste est en cours de development");
          setstate({ email: "", password: "" });
          return;
        } else {
          console.log("ROLE Admin");
          localStorage.setItem("jwt_auth", JSON.stringify(data));
          Cookies.set("jwt_auth", data, { expires: 1, path: "/" });
          console.log("hi there form here", data);
          setAuthToken(data);
          history.push("/");
        }
        setsnackBarState(true);
      })
      .catch(function (err) {
        if (err.response && err.response.data.code === 401) {
          setError("Veuillez entrer des données valides");
        }
        setisLoading(false);
      });
  };
  const onCloseSnackBar = () => {
    setsnackBarState(false);
  };
  const onChangeHandler = (e) => {
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
      primary: { main: "#A8FF78" },
    },
  });
  if (authToken) return <Redirect to="/"></Redirect>;
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
        <h3 className="formHeaderTitle">Authentification</h3>
      </div>
      <div className="inner">
        <form>
          <div className="form">
            <Grid container spacing={4} direction="column">
              <Grid item>
                <TextField
                  error={Boolean(error)}
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
                  error={Boolean(error)}
                  type={showPassword ? "text" : "password"}
                  value={state.password}
                  onChange={onChangeHandler}
                  name="password"
                  fullWidth
                  required
                  label="Mot de passe"
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
                    onClick={loginHandler}
                  >
                    {isLoading ? (
                      <CircularProgress color={"white"} size={26} />
                    ) : (
                      `Continuer`
                    )}
                  </Button>
                </ThemeProvider>
              </Grid>
              <Grid item>
                {error && (
                  <span>
                    <p className={"errorMsg"}>
                      <ErrorIcon size={20}></ErrorIcon>
                      {error}
                    </p>
                  </span>
                )}
              </Grid>
            </Grid>
          </div>
          <p className="forgot-password text-right">
            Vous n'avez pas de compte?<Link to="/register"> S'inscrire</Link>
          </p>
        </form>
        <Snackbar
          autoHideDuration={3000}
          open={snackBarState}
          onClose={onCloseSnackBar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            variant="filled"
            severity="success"
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
          >
            Bienvenue !
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default SignIn;
