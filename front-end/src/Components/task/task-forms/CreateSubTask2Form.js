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

const CreateSubTask2Form = (props) => {
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
        e.preventDefault()
        props.toggleHidden()
        axiosWithAuth().post(`http://localhost:5000/api/users/${userData.id}/tasks/${props.taskId}/subTasks/${props.subTaskId}/subTasks2`, input)
            .then((res) => {
                console.log(res)
                let userTasks = userData.tasks
                const taskIndex = userTasks.findIndex((task) => task.id === props.taskId)
                let task = userTasks[taskIndex]
                let subTasks = task.subTasks
                const subTaskIndex = subTasks.findIndex((subTask) => subTask.id === props.subTaskId)
                let subTask = subTasks[subTaskIndex]
                let subTasks2 = subTask.subTasks2
                subTasks2 = [...subTasks2, res.data]
                subTask = {...subTask, subTasks2}
                subTasks[subTaskIndex] = subTask
                task = {...task, subTasks}
                userTasks[taskIndex] = task

                setUserData({ ...userData, userTasks })
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
                        <h3>Create A New Sub Task</h3>
                        <button type='button' onClick={props.toggleHidden}><span>X</span></button>
                    </div>
                    
            <form onSubmit={submitHandler}>
                <label>
                    Sub Task:
                    <input
                        type = 'text'
                        name = 'task_name'
                        onChange = {changeHandler}
                    />
                    
                    {errors.task_name ? (<p className="form-error">{errors.task_name}</p>) : null}
                </label>
                <label>
                    Description:
                    <input
                        type = 'text'
                        name = 'task_description'
                        onChange = {changeHandler}
                    />
                    
                    {errors.task_description ? (<p className="form-error">{errors.task_description}</p>) : null}
                </label>
                <label>
                    Start:
                    <input
                        type = 'text'
                        name = 'created'
                        onChange = {changeHandler}
                    />
                    
                    {errors.created ? (<p className="form-error">{errors.created}</p>) : null}
                </label>
                <label>
                    Finish:
                    <input
                        type = 'text'
                        name = 'complete_by'
                        onChange = {changeHandler}
                    />
                    
                    {errors.complete_by ? (<p className="form-error">{errors.complete_by}</p>) : null}
                </label>
                <label className = 'outer-radio-container'>
                        Priority:
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
                <p className="form-error">{apiErrorMessage}</p>
                <button type='submit' className='form-button' disabled={buttonDisabled}>Create</button>
            </form>
            </div>
            </div>
        )
    }
}

export default CreateSubTask2Form