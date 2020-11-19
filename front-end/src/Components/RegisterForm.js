import React, { useEffect, useState, useContext } from 'react'
import * as yup from 'yup'
import { useHistory } from 'react-router-dom'

import axiosWithAuth from '../axiosWithAuth'
import { UserContext } from '../contexts/UserContext'

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .email('Must be a valid email address')
        .required('Required'),
    password: yup
        .string()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Password should be 6-16 characters, at least one a-z, one A-Z, one 0-9, and one special characer.")
        .required('Required')
})

const RegisterForm = (props) => {
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
        e.persist()
        yup
            .reach(validationSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors, 
                    [e.target.name]:null
                })
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                })
            })

        setApiErrorMessage(null)
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
    }

    const submitHandler = e => {
        e.preventDefault()
        axiosWithAuth().post('http://localhost:5000/api/users/register', input)
            .then(() => {
                axiosWithAuth().post('http://localhost:5000/api/users/login', input)
                    .then(res => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user-state')
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('user-state', JSON.stringify(res.data.user))
                        setUserData(res.data.user)
                        history.push('/active')
                    })
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
                <h3>Sign Up</h3>
            </div>
        <form onSubmit={submitHandler}>
            <label>
                Email:
                <input 
                    type="text"
                    name="username"
                    onChange={changeHandler}
                />
                {errors.username ? (<p className="form-error-e">{errors.username}</p>) : null}
            </label>
            <label>
                Password:
                <input 
                    type="password"
                    name="password"
                    onChange={changeHandler}
                />
                {errors.password ? (<p className="form-error-p">{errors.password}</p>) : null}
            </label>
            <p className="api-error">{apiErrorMessage}</p>
            <button className='form-button' type="submit" disabled={buttonDisabled}>Sign Up</button>
        </form>
        </div>
    )
}

export default RegisterForm