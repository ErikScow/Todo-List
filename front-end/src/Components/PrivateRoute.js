import React, { useState, useEffect, useContext } from "react"
import { Route, Redirect, useLocation } from "react-router-dom"
import axiosWithAuth from '../axiosWithAuth'

import { UserContext } from '../contexts/UserContext'

import backendUrl from '../backendurl'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, loggedIn } = useContext(UserContext)
    
    const [userData, setUserData] = user
    const [loggedInStatus, setLoggedIn] = loggedIn

    const [authenticated, setAuthenticated] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [stateChecked, setStateChecked] = useState(false)
    

    //data is saved to local storage in login request, then here is set to state if state isnt there. This is here so that when a user refreshes page they wont be logged out and the page they are on doenst change. the loggout component will delete all localstorage
    useEffect(() => {
        if (!userData.id){
            const data = sessionStorage.getItem('user-state')
            setUserData(JSON.parse(data))
            setStateChecked(true)
        } else {
            setStateChecked(true)
        }
    },[])

    

    useEffect(() => {
        //only runs this code after we have verified state is present and or reset it from localstorage. this is here to prevent the component from unmounting before the token is verified
        if (stateChecked){
            const token = sessionStorage.getItem('token')
            if (token && userData.id){
            axiosWithAuth().get(`${backendUrl}/api/users/${userData.id}`)
                .then(() => {
                    setAuthenticated(true)
                    setLoggedIn(true)
                })
                .catch(() => {
                    setAuthenticated(false)
                    sessionStorage.removeItem('token')
                })
                .then(() => {
                    setCompleted(true)
                })
            } else {
                setCompleted(true)
            }
        }
    },[stateChecked])
    
    if (!completed){
        return <div>Loading</div>
    }    
    

    return <Route
        {...rest}
        render={props => {
            if(!authenticated){
                return <Redirect to="/login"/>
            } else {
                return <Component {...props}/>
                
            }
        }}
    />     
}

export default PrivateRoute