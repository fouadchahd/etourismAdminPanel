import React, {useState} from 'react'
import  {Link ,useLocation} from "react-router-dom"
import clsx from 'clsx';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import leithsolution_logo from '../asserts/leithsolution_logo.png';
import { Button, CircularProgress, Grid } from '@material-ui/core';

const SignIn = (props) => {
    const   location=useLocation();
      const [errors, setErrors] = useState({});
      const [user, setUser] = useState({});
      const [showPassword, setshowPassword] = useState(false);
      const [state, setstate] = useState((location.state&&location.state.email&&location.state.password)?{
          email:location.state.email,
          password:location.state.password
        }:
        {email:'',password:''}
        ); 
      const [isLoading, setisLoading] = useState(false);
    const onChangeHandler = (e) => {
        setstate({...state,[e.target.name]: e.target.value});
        };
    
    const handleClickShowPassword = () => {
        setshowPassword(!showPassword );
        };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        };
    const theme = createMuiTheme({
        palette: {
            primary: {main: '#3d4b57'}
        },
        });
    return (
        <div className="outer">
            <header className={"header"}>
                <img className={"headerLogo"} src={leithsolution_logo} alt="leithsolution_logo" />
            </header>
            
            <div className="formHeader">
                    <h3 className="formHeaderTitle">Authentification</h3>
            </div>
            <div className="inner">
                <form>
                    <div className="form">
                    <Grid container spacing={5} direction="column">
                        <Grid item >
                            <TextField error={errors?.email} helperText={errors?.email? errors.email:""} type="email" value={state.email} onChange={onChangeHandler} name="email" fullWidth required label="Adresse e-mail" />
                        </Grid>
                        <Grid item >
                        <TextField
                                    error={errors?.password} helperText={errors?.password? errors.password:""}
                                    type={showPassword ? 'text' : 'password'}
                                    value={state.password} onChange={onChangeHandler} name="password"
                                    fullWidth required
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
                                <Button fullWidth size="large" variant="contained" color="primary" >
                                {isLoading?<CircularProgress />:`Continuer`}
                                </Button>
                            </ThemeProvider>
                        </Grid>
                    
                    </Grid>
                    </div>                       
                    <p className="forgot-password text-right">
                    Vous n'avez pas de compte?<Link to="/register"> S'inscrire</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
