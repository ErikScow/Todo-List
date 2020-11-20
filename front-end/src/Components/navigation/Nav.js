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

    const [dropdown, setDropdown] = useState('hidden')

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

    const toggleDropdown = () => {
        if (dropdown === 'hidden'){
            setDropdown('')
        } else {
            setDropdown('hidden')
        }
    }

    const activeClass = `tabs-link ${activeTab}`
    const completedClass = `tabs-link ${completedTab}`
    const discardedClass = `tabs-link ${discardedTab}`

    const linkContainerClass = `links-container ${dropdown}`
    const topNavClass = `top-nav ${dropdown}`

    const firstInDropDownClass = `first-in-drop ${dropdown}`
    
    if (loggedInStatus === false){
        return(
            <div className={topNavClass}>
                <div className = 'wrapper'>
                    <h1>My Lists</h1>
                    <a className = 'icon ' href='javascript:void(0);' onClick={toggleDropdown}>☰</a>
                </div>
                <div className={linkContainerClass}>
                    <Link className={firstInDropDownClass} to="/" onClick={toggleDropdown}><button>About</button></Link>
                    <Link className={dropdown} to="/login" onClick={toggleDropdown}><button>Login</button></Link>
                    <Link className={dropdown} to="/register" onClick={toggleDropdown}><button>Sign Up</button></Link>
                </div>
                
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