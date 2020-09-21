import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"
import axiosWithAuth from '../axiosWithAuth'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authenticated, setAuthenticated] = useState(false)
    axiosWithAuth().get('http://localhost:5000/')
        .then(() => setAuthenticated(true))
        .catch(() => setAuthenticated(false))

    return <Route
        {...rest}
        render={props => 
            authenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />     
}

export default PrivateRoute