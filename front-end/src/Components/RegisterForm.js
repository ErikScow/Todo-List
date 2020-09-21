import React, { useEffect, useState } from 'react'
import * as yup from 'yup'

import axiosWithAuth from '../axiosWithAuth'

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .email('Must be a valid email address')
        .required('Required'),
    password: yup
        .string()
        .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Password should be between 6 and 16 characters, contain at least one lowercase character, one uppercase characer, one number, and one special character")
        .required('Required')
})

const LoginForm = () => {
    const [input, setInput] = useState('')
    const [errors, setErrors] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [apiErrorMessage, setApiErrorMessage] = useState(null)

    useEffect(() => {
        validationSchema.isValid(input).then(valid => {
            setButtonDisabled(!valid)
        })
    }, [input])

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
                        console.log(res.data)
                        
                    })
            })
            .catch(err => {
                if (err.response.data.message){
                    setApiErrorMessage(err.response.data.message)
                } else {
                    setApiErrorMessage(err)
                }
            })
            .then(() => {
                axiosWithAuth().post('http://localhost:5000/api/users/login', input)
                    .then()
            })
    }

    return(
        <form onSubmit={submitHandler}>
            <label>
                Email
                <input 
                    type="text"
                    name="username"
                    onChange={changeHandler}
                />
                {errors.username ? (<p className="form-error">{errors.username}</p>) : null}
            </label>
            <label>
                Password
                <input 
                    type="password"
                    name="password"
                    onChange={changeHandler}
                />
                {errors.password ? (<p className="form-error">{errors.password}</p>) : null}
            </label>
            <p className="form-error">{apiErrorMessage}</p>
            <button type="submit" disabled={buttonDisabled}>Sign Up</button>
        </form>
    )
}

export default LoginForm