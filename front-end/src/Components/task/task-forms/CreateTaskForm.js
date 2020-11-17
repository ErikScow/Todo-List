import React, { useState, useContext, useEffect } from 'react'
import * as yup from 'yup'
import axiosWithAuth from '../../../axiosWithAuth'
import { UserContext } from '../../../contexts/UserContext'

const validationSchema = yup.object().shape({
    task_name: yup
        .string()
        .required('Required'),
    task_description: yup
        .string()
        .required('Required'),
    created: yup
        .string(),
    complete_by: yup
        .string(),
    priority: yup
        .string(),
})

const CreateTaskForm = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [input, setInput] = useState({})
    const [errors, setErrors] = useState('')

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [apiErrorMessage, setApiErrorMessage] = useState(null)

    useEffect(() => {
        localStorage.removeItem('user-state')
        localStorage.setItem('user-state', JSON.stringify(userData))
    }, [userData])

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
        props.toggleHidden()
        e.preventDefault()
        axiosWithAuth().post(`http://localhost:5000/api/users/${userData.id}/tasks`, input)
            .then((res) => {
                res.data = {...res.data, subTasks: []} //add 'fake' subTasks array to state temporarily bc it wont be added to the task data until it is retrieved from the db itself, and we dont want to do another api call right now
                setUserData({
                    ...userData, 
                    tasks:[
                        ...userData.tasks,
                        res.data
                    ]
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
    if (props.hidden){
        return null
    } else {
        return(
            <div className = 'backdrop-container'>
                <div className = 'backdrop' onClick={props.toggleHidden}></div>
                <div className='modal'>
                    <div className='top-row'>
                        <h3>Create a new Task</h3>
                        <button type='button' onClick={props.toggleHidden}><span>X</span></button>
                    </div>
                    
                <form onSubmit={submitHandler}>
                    
                    <label>
                        Task
                        <input
                            type = 'text'
                            name = 'task_name'
                            onChange = {changeHandler}
                        />
                        
                        {errors.task_name ? (<p className="form-error">{errors.task_name}</p>) : null}
                    </label>
                    <label>
                        Description
                        <input
                            type = 'text'
                            name = 'task_description'
                            onChange = {changeHandler}
                        />
                        
                        {errors.task_description ? (<p className="form-error">{errors.task_description}</p>) : null}
                    </label>
                    <label>
                        Start By
                        <input
                            type = 'text'
                            name = 'created'
                            onChange = {changeHandler}
                        />
                        
                        {errors.created ? (<p className="form-error">{errors.created}</p>) : null}
                    </label>
                    <label>
                        Finish By
                        <input
                            type = 'text'
                            name = 'complete_by'
                            onChange = {changeHandler}
                        />
                        
                        {errors.complete_by ? (<p className="form-error">{errors.complete_by}</p>) : null}
                    </label>
                    <label>
                        Priority
                        <select name='priority' size='3' onChange={changeHandler}>
                            <option value='0'>Low</option>
                            <option value='1'>Neutral</option>
                            <option value='2'>High</option>
                        </select>
                        {errors.priority ? (<p className="form-error">{errors.priority}</p>) : null}
                    </label>
                    <p className="form-error">{apiErrorMessage}</p>
                    <button type='submit' disabled={buttonDisabled}>Create</button>
                    
                </form>
                
            </div>
            </div>
            
            
        )
    }
}

export default CreateTaskForm