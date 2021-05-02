import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import {SignIn,SignUp, Home, NotFound } from "./pages";
import Main from './pages/Main';
import Users from './components/Users';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
   <BrowserRouter basename="/">
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/" exact component={Main} />
      <Route path="/users" component={Users} />
      <Redirect from="/" to="/"></Redirect>
      <Route component={NotFound} />
    </Switch>
    </BrowserRouter>
    
  );
}

export default App;
