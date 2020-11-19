import React, { useEffect, useState, useContext } from 'react'
import * as yup from 'yup'

import { useHistory } from 'react-router-dom'

import axiosWithAuth from '../axiosWithAuth'
import { UserContext } from '../contexts/UserContext'

const LoginForm = () => {
    const validationSchema = yup.object().shape({
        username: yup
            .string()
            .required('Required'),
        password: yup
            .string()
            .required('Required')
    })

    const { loggedIn, user } = useContext(UserContext)
    const [loggedInStatus, setLoggedIn] = loggedIn
    const [userData, setUserData] = user

    const [input, setInput] = useState('')
    const [errors, setErrors] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [apiErrorMessage, setApiErrorMessage] = useState(null)

    useEffect(() => {
        validationSchema.isValid(input).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [input])

    let history = useHistory()

    const changeHandler = e => {
        setApiErrorMessage(null)
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axiosWithAuth().post('http://localhost:5000/api/users/login', input)
            .then(res => {
                localStorage.removeItem('token')
                localStorage.removeItem('user-state')
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user-state', JSON.stringify(res.data.user))
                setUserData(res.data.user)
                history.push('/active')
            })
            .catch(err => {
                if (err.response && err.response.data.message){
                    setApiErrorMessage(err.response.data.message)
                } else {
                    setApiErrorMessage("Network Error")
                }
            })
    }


    return(
        <div className='front-modal'>
            <div className = 'top-row'>
                <h3>Log In</h3>
            </div>
        <form onSubmit={submitHandler}>
            
            
            <label>
                Email:
                <input 
                    type="text"
                    name="username"
                    onChange={changeHandler}
                />
                {errors.username ? (<p className="form-error">{errors.username}</p>) : null}
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    name="password"
                    onChange={changeHandler}
                />
                {errors.password ? (<p className="form-error">{errors.password}</p>) : null}
            </label>
            <p className="api-error">{apiErrorMessage}</p>
            <button className='form-button' type="submit" disabled={buttonDisabled} className='form-button' >Log In</button>
        </form>
        </div>
    )
}

export default LoginForm