import React,{useState} from 'react'
import {Link} from "react-router-dom";
import AuthService from "../services/auth.service";
const SignUp = () => {

    const [state, setstate] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    });
    const [isLoading, setisLoading] = useState(false);

    const registerHandler = (e) =>{
            e.preventDefault();
            let {firstName,lastName,email,password}={...state};
            setisLoading(true);
            let response= AuthService.registerAdmin(firstName,lastName,email,password);
            setisLoading(false);
            console.log(response);
    }
    const onChangeHandler= (e)=>{
        e.preventDefault();
        setstate({...state,[e.target.name]: e.target.value});
    }
    return (
        <div className="outer">
        <div className="inner">
            <form onSubmit={(e)=>registerHandler(e)}>
        <h3> S'inscrire </h3>

        <div className="form-group">
            <label>Prénom</label>
            <input type="text" name="firstName" value={state.firstName} onChange={onChangeHandler} className="form-control" placeholder="First name" />
        </div>

        <div className="form-group">
            <label>Nom de famille</label>
            <input type="text" name="lastName" value={state.lastName} onChange={onChangeHandler} className="form-control" placeholder="Last name" />
        </div>

        <div className="form-group">
            <label>Adresse e-mail</label>
            <input type="email" onChange={onChangeHandler} className="form-control" placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" onChange={onChangeHandler} className="form-control" placeholder="Enter password" />
        </div>

        <button type="submit" className="btn btn-dark btn-lg btn-block">{isLoading?`...`:`S'inscrire`}</button>
        <p className="forgot-password text-right">
        Vous avez déjà un compte? <Link to="/login"> S'identifier</Link>
        </p>
    </form>
        </div>
        </div>
    )
}

export default SignUp;
