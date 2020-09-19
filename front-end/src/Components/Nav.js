import React from 'react'
import {
    Link,
    Switch,
    Route
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const loggedIn = false

function Nav(){
    const { passed } = useContext(UserContext)
    const [statePassed, setStatePassed] = passed

    console.log(passed)
    if (loggedIn === false){
        return(
            <div>
                <div>context: {statePassed.here}</div>
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