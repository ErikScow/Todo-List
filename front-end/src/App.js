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

import Active from './components/tasks/Active'

import { UserContext } from './contexts/UserContext'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const[user, setUser] = useState({})

  return (
    <Router>
      <UserContext.Provider value={{
        loggedIn : [loggedIn, setLoggedIn],
        user : [user, setUser]
        }}>
        <Nav/>
        <Switch>
            <Route exact path="/"></Route>
            <Route path="/login"></Route>
            <Route path="/register"><RegisterForm /></Route>
            <PrivateRoute path="/active" component={Active}/>
            <PrivateRoute path="/completed" />
            <PrivateRoute path="/discarded" />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
