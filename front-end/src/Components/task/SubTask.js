import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../axiosWithAuth'

import { UserContext } from '../../contexts/UserContext'

import SubTask2 from './SubTask2'
import CreateSubTask2Form from './task-forms/CreateSubTask2Form'
import UpdateSubTaskForm from './task-forms/UpdateSubTaskForm'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hiddenEdit, setHiddenEdit] = useState(true)
    const [hidden, setHidden] = useState(true)
    const [hideCompleted, setHideCompleted] = useState(true)

    const [createButtonValue, setCreateButtonValue] = useState('Add a sub task')
    const [editButtonValue, setEditButtonValue] = useState('Edit')
    const [statusButtonValue, setStatusButtonValue] = useState('Finish Task')
    const [hideCompletedButton, setHideCompletedButton] = useState('Show Completed Sub Tasks')

    const changeTaskStatus = () => {
        let update = {}
        if (props.subTask.status === 0){
            update.status = 1
        } else if (props.subTask.status === 1){
            update.status = 0
        }
        
        axiosWithAuth().put(`http://localhost:5000/api/users/${userData.id}/tasks/${props.task.id}/subTasks/${props.subTask.id}/`, update)
            .then((res) => {

                let userTasks = userData.tasks
                const index = userTasks.findIndex((task) => task.id === props.task.id)

                let subTasks = userData.tasks[index].subTasks

                const subTaskIndex = subTasks.findIndex((subTask) => subTask.id === props.subTask.id)

                let subTasks2 = userData.tasks[index].subTasks[subTaskIndex].subTasks2
                res.data.updated = {...res.data.updated, subTasks2: subTasks2}

                let subTask = res.data.updated
                subTasks[subTaskIndex] = subTask
                let task = {...props.task, subTasks}
                userTasks[index] = task

                setUserData({...userData, userTasks})
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toggleHidden = () => {
        if (hidden){
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    const toggleHiddenEdit = () => {
        if (hiddenEdit){
            setHiddenEdit(false)
        } else {
            setHiddenEdit(true)
        }
    }

    const toggleHideCompleted = () => {
        if (hideCompleted){
            setHideCompleted(false)
        } else {
            setHideCompleted(true)
        }
    }

    useEffect(() => {
        if(hidden){
            setCreateButtonValue('Add a sub task')
        } else {
            setCreateButtonValue('Cancel')
        }
    }, [hidden])

    useEffect(() => {
        if(hiddenEdit){
            setEditButtonValue('Edit')
        } else {
            setEditButtonValue('Cancel')
        }
    }, [hiddenEdit])

    useEffect(() => {
        if(hideCompleted){
            setHideCompletedButton('Show Completed Sub Tasks')
        } else {
            setHideCompletedButton('Hide Completed Sub Tasks')
        }
    },[hideCompleted])

    useEffect(() => {
        if(props.subTask.status === 0){
            setStatusButtonValue('Finish Task')
        } else if (props.subTask.status === 1){
            setStatusButtonValue('Not Finished')
        } else {
            setStatusButtonValue(null)
        }
    }, [props.subTask.status])

    const className = `sub-task ${props.priority}`
    return(
        <div className={className}>
            <button className='task-button status-button'onClick={changeTaskStatus}>{statusButtonValue}</button>
            <h4>{props.subTask.task_name}</h4>
            <button className='task-button'onClick={toggleHidden}>{createButtonValue}</button>
            <button className='task-button'onClick={toggleHiddenEdit}>{editButtonValue}</button>
            <CreateSubTask2Form hidden={hidden} toggleHidden={toggleHidden} task={props.task} taskId={props.taskId} subTask={props.subTask} subTaskId={props.subTask.id}/>
            <UpdateSubTaskForm hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task} subTask={props.subTask}/>
            {props.subTask.subTasks2.map((subTask2, i) => {
                if(subTask2.priority === 2 && subTask2.status === 0){
                    return <SubTask2 priority='high-priority' key={i} subTask={props.subTask} task={props.task} subTask2={subTask2}/>
                }
            })}
            {props.subTask.subTasks2.map((subTask2, i) => {
                if(subTask2.priority === 1 && subTask2.status === 0){
                    return <SubTask2 priority='mid-priority' key={i} subTask={props.subTask} task={props.task} subTask2={subTask2}/>
                }
            })}
            {props.subTask.subTasks2.map((subTask2, i) => {
                if(subTask2.priority === 0 && subTask2.status === 0){
                    return <SubTask2 priority='low-priority' key={i} subTask={props.subTask} task={props.task} subTask2={subTask2}/>
                }
            })}
            <button className='task-button'onClick={toggleHideCompleted}>{hideCompletedButton}</button>
            {props.subTask.subTasks2.map((subTask2, i) => {
                if(subTask2.status === 1 && hideCompleted === false){
                    return <SubTask2 priority='completed-priority' key={i} subTask={props.subTask} task={props.task} subTask2={subTask2}/>
                }
            })}
        </div>
    )
}

export default Task