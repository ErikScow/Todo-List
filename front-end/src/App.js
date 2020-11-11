import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Nav from './components/navigation/Nav'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

import Active from './components/tabs/Active'
import Completed from './components/tabs/Completed'
import Discarded from './components/tabs/Discarded'

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
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <PrivateRoute path="/active" component={Active}/>
            <PrivateRoute path="/completed" component={Completed}/>
            <PrivateRoute path="/discarded" component={Discarded}/>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
