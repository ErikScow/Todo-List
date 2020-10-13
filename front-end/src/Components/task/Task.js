import React, { useState, useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

import SubTask from './SubTask'
import CreateSubTaskForm from './task-forms/CreateSubTaskForm'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    return(
        <div>
            <h3>{props.task.task_name}</h3>
            <CreateSubTaskForm taskId ={props.task.id}/>
            {
                props.task.subTasks.map((subTask, i) => {
                    return <SubTask key={i} subTask={subTask}/>
                })
            }
        </div>
    )
}

export default Task