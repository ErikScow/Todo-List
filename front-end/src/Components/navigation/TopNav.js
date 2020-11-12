import React from 'react'
import {
    Link, useHistory
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import axiosWithAuth from '../../axiosWithAuth'


const TopNav = () => {
    const { loggedIn, user } = useContext(UserContext)
    const [loggedInStatus, setLoggedIn] = loggedIn
    const [userData, setUserData] = user

    const history = useHistory()

    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user-data')
        setLoggedIn(false)
        history.push('/')
        
    }

    if (!loggedInStatus) {
        return null
    }
    return(
        <div className='top-nav'>
            <h1>My Lists</h1>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
    
}

export default TopNav