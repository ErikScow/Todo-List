import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import TopNav from './components/navigation/TopNav'
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
        <TopNav/>
          <Nav/>
          <div className='content-container'>
            <Switch>
                <Route exact path="/"></Route>
                <Route path="/login" component={LoginForm}/>
                <Route path="/register" component={RegisterForm}/>
                <PrivateRoute path="/active" component={Active}/>
                <PrivateRoute path="/completed" component={Completed}/>
                <PrivateRoute path="/discarded" component={Discarded}/>
            </Switch>
          </div>
          
        
      </UserContext.Provider>
    </Router>
  );
}

export default App;
