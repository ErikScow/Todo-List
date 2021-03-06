import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../../axiosWithAuth'
import { UserContext } from '../../../contexts/UserContext'

import backendUrl from '../../../backendurl'

const UpdateTaskForm = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [input, setInput] = useState({})
    const [errors, setErrors] = useState('')

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [apiErrorMessage, setApiErrorMessage] = useState(null)

    useEffect(() => {
        let validInput = false
        for (const property in input){
            if (property){
                    validInput = true
            }
        }
        if (validInput){
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    },[input])

    useEffect(() => {
        sessionStorage.removeItem('user-state')
        sessionStorage.setItem('user-state', JSON.stringify(userData))
    }, [userData])
    
    const changeHandler = e => {
        e.persist()
        if (e.target.value.trim().length !== 0){
            setInput({
                ...input,
                [e.target.name]: e.target.value 
            })
        } else {
            setInput({
                ...input,
                [e.target.name]: null
            })
        }
    }

    const submitHandler = e => {
        e.preventDefault()
        props.toggleHiddenEdit()
        
        
        axiosWithAuth().put(`${backendUrl}/api/users/${userData.id}/tasks/${props.task.id}`, input)
            .then((res) => {

                let userTasks = userData.tasks
                const index = userTasks.findIndex((task) => task.id === props.task.id)

                let subTasks = userData.tasks[index].subTasks
                res.data.updated = {...res.data.updated, subTasks: subTasks}

                let task = res.data.updated
                userTasks[index] = task

                setUserData({...userData, userTasks})
            })
            .catch(err => {
                if (err.response && err.response.data.message){
                    setApiErrorMessage(err.response.data.message)
                } else {
                    setApiErrorMessage("Network Error")
                }
            })
    }

    const deleteTask = () => {
        props.toggleHiddenEdit()
        axiosWithAuth().delete(`${backendUrl}/api/users/${userData.id}/tasks/${props.task.id}`)
            .then((res) => {

                let userTasks = userData.tasks
                const index = userTasks.findIndex((task) => task.id === props.task.id)

                userTasks.splice(index, 1)

                setUserData({...userData, userTasks})
            })
            .catch(err => {
                if (err.response && err.response.data.message){
                    setApiErrorMessage(err.response.data.message)
                } else {
                    setApiErrorMessage("Network Error")
                }
            })
    }

    if (props.hiddenEdit){
        return null
    } else {
        return(
            <div className = 'backdrop-container'>
                <div className = 'backdrop' onClick={props.toggleHiddenEdit}></div>
                <div className='modal'>
                    <div className='top-row'>
                        <h3>Edit Task</h3>
                        <button type='button' onClick={props.toggleHiddenEdit}><span>X</span></button>
                    </div>
            <form onSubmit={submitHandler}>
                <label>
                    New Task Name:
                    <input
                        className = 'text-input'
                        type = 'text'
                        name = 'task_name'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    New Description:
                    <textarea
                        className = 'text-input'
                        type = 'text'
                        name = 'task_description'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    New Start:
                    <input
                        className = 'text-input'
                        type = 'text'
                        name = 'created'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    New Finish:
                    <input
                        className = 'text-input'
                        type = 'text'
                        name = 'complete_by'
                        onChange = {changeHandler}
                    />
                </label>
                <label className = 'outer-radio-container'>
                        New Priority:
                        <div className='radio-container'>
                            <input type='radio' name='priority' value='0' onChange={changeHandler}/><p>Low</p>
                        </div>
                        <div className='radio-container'>
                            <input type='radio' name='priority' value='1' onChange={changeHandler}/><p>Neutral</p>
                        </div>
                        <div className='radio-container'>
                            <input type='radio' name='priority' value='2' onChange={changeHandler}/><p>High</p>
                        </div>
                        
                        
                        
                        {errors.priority ? (<p className="form-error">{errors.priority}</p>) : null}
                    </label>
                <p className="api-error">{apiErrorMessage}</p>
                <button type='submit' className='form-button' disabled={buttonDisabled}>Update</button>
                <button type="button" className='form-button' onClick={deleteTask}>Delete Task</button>
            </form>
            </div>
            </div>
        )
    }
}

export default UpdateTaskForm