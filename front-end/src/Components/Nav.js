import React, { useEffect } from 'react'
import {
    Link, useHistory
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'


const Nav = () => {
    const { loggedIn } = useContext(UserContext)
    const [loggedInStatus, setLoggedIn] = loggedIn

    const history = useHistory()

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user-data')
        setLoggedIn(false)
        history.push('/')
        
    }

    if (loggedInStatus === false){
        return(
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
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
                <button onClick={logOut}>Log Out</button>
            </div>
        )
    }
        

        
    
    
}

export default Nav