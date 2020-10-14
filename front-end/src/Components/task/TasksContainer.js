import React, { useState, useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

import CreateTaskForm from './task-forms/CreateTaskForm'
import Task from './Task'

const TasksContainer = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    return(
        <div>
            
            {userData.tasks.map((task, i) => {
                if (props.status === userData.tasks[i].status){
                    return <Task key={i} task={task}/>
                }
            })}
        </div>
    )
}

export default TasksContainer