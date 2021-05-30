import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import {SignIn,SignUp, Home, NotFound } from "./pages";
import Main from './pages/Main';
import Users from './components/Users';
import { BrowserRouter } from 'react-router-dom';
import{AuthProvider} from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/login" exact component={SignIn} />
          <Route path="/register" exact component={SignUp} />
          <ProtectedRoute path="/" exact><Main></Main></ProtectedRoute>
          <Route path="/users" component={Users} />
          <Redirect to="/"></Redirect>
          <Route component={NotFound} />
        </Switch>
        </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;
