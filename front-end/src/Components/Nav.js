import React, { useEffect} from 'react'
import {
    Link
} from 'react-router-dom'

import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

const loggedIn = false

const Nav = () => {
    const { passed } = useContext(UserContext)
    const [statePassed, setStatePassed] = passed
    useEffect(()=>{
    console.log(statePassed)
    setStatePassed( { ...statePassed, here: 'newstate' } )
    },[])
    if (loggedIn === false){
        return(
            <div>
                <div>context: {statePassed.another}, {statePassed.here}</div>
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
            </div>
        )
    }
        

        
    
    
}

export default Nav