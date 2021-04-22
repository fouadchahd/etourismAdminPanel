import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import './App.css';
import {SignIn,SignUp, Home } from "./pages";

function App() {
  return (
    <>
    <Switch>
      <Route path="/login" exact component={SignIn} />
      <Route path="/register" exact component={SignUp} />
      <Route path="/" exact component={Home} />
    </Switch>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossOrigin="anonymous"></script>
    </>
  );
}

export default App;
