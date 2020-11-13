import React, { useEffect } from 'react'
import {
    Link
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'


const Nav = () => {
    const { loggedIn } = useContext(UserContext)
    const [loggedInStatus, setLoggedIn] = loggedIn

    if (loggedInStatus === false){
        return(
            <div className=''>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Sign Up</Link></li>
                </ul>
            </div>
            
            
        )
    } else {
        return(
            <div className='tabs'>
                <div className='links-container'>
                    <Link className='tabs-link' to="/active">Active</Link>
                    <Link className='tabs-link' to="/completed">Completed</Link>
                    <Link className='tabs-link' to="/discarded">Discarded</Link>
                </div>
            </div>
        )
    }
        

        
    
    
}

export default Nav