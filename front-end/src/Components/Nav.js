import React from 'react'
import {
    Link,
    Switch,
    Route
} from 'react-router-dom'

function Nav(){
    const loggedIn = true
    if (loggedIn === false){
        return(
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/"></Route>
                    <Route path="/login"></Route>
                    <Route path="/register"></Route>
                </Switch>
            </div>
        )
    } else {
        return(
            <div>
                <ul>
                    <li><Link to="/active">Active</Link></li>
                    <li><Link to="/completed">Completed</Link></li>
                    <li><Link to="/discarded">Discarded</Link></li>
                </ul>
                <Switch>
                    <Route path="/active"></Route>
                    <Route path="/completed"></Route>
                    <Route path="/discarded"></Route>
                </Switch>
            </div>
        )
    }
    
}

export default Nav