import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../../axiosWithAuth'
import { UserContext } from '../../../contexts/UserContext'

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
        localStorage.removeItem('user-state')
        localStorage.setItem('user-state', JSON.stringify(userData))
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
        console.log(input)
    }

    const submitHandler = e => {
        e.preventDefault()
        props.toggleHiddenEdit()
        
        
        axiosWithAuth().put(`http://localhost:5000/api/users/${userData.id}/tasks/${props.task.id}`, input)
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
    if (props.hiddenEdit){
        return null
    } else {
        return(
            <form onSubmit={submitHandler}>
                <label>
                    Task
                    <input
                        type = 'text'
                        name = 'task_name'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    Description
                    <input
                        type = 'text'
                        name = 'task_description'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    Start By
                    <input
                        type = 'text'
                        name = 'created'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    Finish By
                    <input
                        type = 'text'
                        name = 'complete_by'
                        onChange = {changeHandler}
                    />
                </label>
                <label>
                    Priority
                    <select name='priority' size='3' onChange={changeHandler}>
                        <option value='0'>Low</option>
                        <option value='1'>Neutral</option>
                        <option value='2'>High</option>
                    </select>
                </label>
                <p className="form-error">{apiErrorMessage}</p>
                <button type='submit' disabled={buttonDisabled}>Update</button>
            </form>
        )
    }
}

export default UpdateTaskForm