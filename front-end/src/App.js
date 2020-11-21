import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import PrivateRoute from './Components/PrivateRoute'
import TopNav from './Components/navigation/TopNav'
import Nav from './Components/navigation/Nav'
import RegisterForm from './Components/RegisterForm'
import LoginForm from './Components/LoginForm'

import Active from './Components/tabs/Active'
import Completed from './Components/tabs/Completed'
import Discarded from './Components/tabs/Discarded'

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
          <div className = 'front-content-container'>
            <Switch>
              <Route exact path="/"></Route>
              <Route path="/login" component={LoginForm}/>
              <Route path="/register" component={RegisterForm}/>
            </Switch>
          </div>
          
            
          <div className='content-container'>
            <Switch>
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
