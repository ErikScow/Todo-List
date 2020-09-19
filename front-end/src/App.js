import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from 'react-router-dom'

import Nav from './Components/Nav'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
      </div>
    </Router>
    
  );
}

export default App;
