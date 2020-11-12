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
                
                if (task.priority === 2) {
                    if (props.status === userData.tasks[i].status){
                    return <Task priority='high-priority' key={i} task={task}/>
                    }
                }
                
            })}
            {userData.tasks.map((task, i) => {
                
                if (task.priority === 1) {
                    if (props.status === userData.tasks[i].status){
                    return <Task priority='mid-priority' key={i} task={task}/>
                    }
                }
                
            })}
           {userData.tasks.map((task, i) => {
                
                if (task.priority === 0) {
                    if (props.status === userData.tasks[i].status){
                    return <Task priority='low-priority' key={i} task={task}/>
                    }
                }
                
            })}
        </div>
    )
}

export default TasksContainer