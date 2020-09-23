import React, { useState, useEffect, useContext } from "react"
import { Route, Redirect, useLocation } from "react-router-dom"
import axiosWithAuth from '../axiosWithAuth'

import { UserContext } from '../contexts/UserContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(UserContext)
    
    const [userData, setUserData] = user
    const [authenticated, setAuthenticated] = useState(false)
    const [completed, setCompleted] = useState(false)
    

    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log('token '  , token)
        console.log('id ',userData)
        if (token && userData.id){
        axiosWithAuth().get(`http://localhost:5000/api/users/${userData.id}`)
            .then(() => {
                console.log('authenticated')
                setAuthenticated(true)
            })
            .catch(() => {
                console.log('rejected')
                setAuthenticated(false)
                localStorage.removeItem('token')
            })
            .then(() => {
                setCompleted(true)
            })
        } else {
            console.log('missing id or token')
            setCompleted(true)
        }
    },[])
    
    console.log('auth', authenticated)
    console.log('completed', completed)
    if (!completed){
        return <div>Loading</div>
    }    
    

    return <Route
        {...rest}
        render={props => {
            if(!authenticated){
                console.log('will not render')
                return <Redirect to="/login"/>
            } else {
                console.log('will render ',authenticated)
                return <Component {...props}/>
                
            }
        }}
    />     
}

export default PrivateRoute