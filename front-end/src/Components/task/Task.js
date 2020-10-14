import React, { useState, useContext, useEffect } from 'react'

import { UserContext } from '../../contexts/UserContext'

import SubTask from './SubTask'
import CreateSubTaskForm from './task-forms/CreateSubTaskForm'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hidden, setHidden] = useState(true)
    const [buttonValue, setButtonValue] = useState('Add a sub task')

    const toggleHidden = () => {
        if (hidden){
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    useEffect(() => {
        if(hidden){
            setButtonValue('Add a sub task')
        } else {
            setButtonValue('Cancel')
        }
    }, [hidden])

    return(
        <div>
            <h3>{props.task.task_name}</h3>
            <button onClick={toggleHidden}>{buttonValue}</button>
            <CreateSubTaskForm taskId ={props.task.id} hidden={hidden}/>
            {
                props.task.subTasks.map((subTask, i) => {
                    return <SubTask key={i} subTask={subTask}/>
                })
            }
        </div>
    )
}

export default Task