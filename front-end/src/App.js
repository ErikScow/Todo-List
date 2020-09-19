import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from 'react-router-dom'

import Nav from './components/Nav'

import { UserContext } from './contexts/UserContext'

function App() {

  const[passed, setPassed] = useState({here: 'something'})
  console.log(passed.here)

  return (
    <Router>
      <UserContext.Provider value={{passed :[passed, setPassed]}}>
        <Nav/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
