import React, { useEffect, useState } from 'react'
import {
    Link,
    useLocation
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'


const Nav = () => {
    const { loggedIn, user } = useContext(UserContext)
    const [loggedInStatus, setLoggedIn] = loggedIn
    const [userData, setUserData] = user

    const location = useLocation()
    let activeTab = ''
    let completedTab = ''
    let discardedTab = ''


        if (location.pathname === '/active'){
            activeTab = 'current'
            completedTab = ''
            discardedTab = ''
        } else if (location.pathname === '/completed'){
            activeTab = ''
            completedTab = 'current'
            discardedTab = ''
        } else if (location.pathname === '/discarded'){
            activeTab = ''
            completedTab = ''
            discardedTab = 'current'
        }
    
    const activeClass = `link-container-inner ${activeTab}`
    const completedClass = `link-container-inner ${completedTab}`
    const discardedClass = `link-container-inner ${discardedTab}`

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
                    <Link className='tabs-link' to="/active"><div className = {activeClass}>Active</div></Link>
                    <Link className='tabs-link' to="/completed"><div className ={completedClass}>Completed</div></Link>
                    <Link className='tabs-link' to="/discarded"><div className = {discardedClass}>Discarded</div></Link>
                </div>
            </div>
        )
    }
        

        
    
    
}

export default Nav