import React from 'react'
import  {Link } from "react-router-dom"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
const SignIn = () => {
    const [values, setValues] = React.useState({
        password: '',
        email:'',
        showPassword: false
      });
    
    const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    return (
        <div className="outer">
            <div className="inner">
                <form>
                    <h3>Authentification</h3>
                    <div className="form">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="floatingInput"/>
                            <label for="floatingInput">Adresse e-mail</label>
                        </div>
                        <div class="form-floating">
                            <input type="password" class="form-control is-invalid" id="floatingPassword" />
                            <label for="floatingPassword">mot de passe</label>
                        </div>
                    </div>   
                    <button type="submit" className="btn btn-dark btn-lg btn-block mt-3">Sign in</button>
                    <p className="forgot-password text-right">
                    Vous n'avez pas de compte?<Link to="/register"> S'inscrire</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignIn;
