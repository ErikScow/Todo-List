import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Nav from './components/Nav'
import RegisterForm from './components/RegisterForm'

import { UserContext } from './contexts/UserContext'

function App() {

  const[passed, setPassed] = useState({another: 'something else',here: 'something'})

  return (
    <Router>
      <UserContext.Provider value={{passed :[passed, setPassed]}}>
        <Nav/>
        <Switch>
            <Route exact path="/"></Route>
            <Route path="/login"></Route>
            <Route path="/register"><RegisterForm /></Route>
            <PrivateRoute path="/active" />
            <PrivateRoute path="/completed" />
            <PrivateRoute path="/discarded" />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
