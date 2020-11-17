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
    
    const activeClass = `tabs-link ${activeTab}`
    const completedClass = `tabs-link ${completedTab}`
    const discardedClass = `tabs-link ${discardedTab}`

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
                    <Link className={activeClass} to="/active"><div className = 'link-container-inner'>Active</div></Link>
                    <Link className={completedClass} to="/completed"><div className = 'link-container-inner'>Completed</div></Link>
                    <Link className={discardedClass} to="/discarded"><div className = 'link-container-inner'>Discarded</div></Link>
                </div>
            </div>
        )
    }
        

        
    
    
}

export default Nav