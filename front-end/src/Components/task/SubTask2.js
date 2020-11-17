import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../axiosWithAuth'

import { UserContext } from '../../contexts/UserContext'

import UpdateSubTask2Form from './task-forms/UpdateSubTask2Form'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hiddenEdit, setHiddenEdit] = useState(true)
    const[statusButtonValue, setStatusButtonValue] = useState('Finish Task')
    const [editButtonValue, setEditButtonValue] = useState('Edit')
    const [toggled, setToggled] = useState(false)

    const changeTaskStatus = () => {
        setToggled(true)
        let update = {}
        if (props.subTask2.status === 0){
            update.status = 1
        } else if (props.subTask2.status === 1){
            update.status = 0
        }
        axiosWithAuth().put(`http://localhost:5000/api/users/${userData.id}/tasks/${props.task.id}/subTasks/${props.subTask.id}/subTasks2/${props.subTask2.id}`, update)
            .then((res) => {
                let userTasks = userData.tasks
                const index = userTasks.findIndex((task) => task.id === props.task.id)

                let subTasks = userData.tasks[index].subTasks

                const subTaskIndex = subTasks.findIndex((subTask) => subTask.id === props.subTask.id)

                let subTasks2 = userData.tasks[index].subTasks[subTaskIndex].subTasks2

                const subTask2Index = subTasks2.findIndex((subTask2) => subTask2.id === props.subTask2.id)

                let subTask2 = res.data.updated
                subTasks2[subTask2Index] = subTask2
                let subTask = {...props.subTask, subTasks2}
                subTasks[subTaskIndex] = subTask
                let task = {...props.task, subTasks}
                userTasks[index] = task

                setUserData({...userData, userTasks})
            })
            .catch(err => {
                console.log(err)
            })
    }

    const toggleHiddenEdit = () => {
        if (hiddenEdit){
            setHiddenEdit(false)
        } else {
            setHiddenEdit(true)
        }
    }

    useEffect(() => {
        if(hiddenEdit){
            setEditButtonValue('Edit')
        } else {
            setEditButtonValue('Cancel')
        }
    }, [hiddenEdit])
    
    useEffect(() => {
            if(props.subTask2.status === 0){
                setStatusButtonValue('Finish Task')
            } else if (props.subTask2.status === 1){
                setStatusButtonValue('Not Finished')
            } else {
                setStatusButtonValue(null)
            }
        }, [props.subTask2.status])

    let status = ''
    if(props.subTask2.status === 0 ){
        status = 'incomplete'
    } else if (props.subTask2.status === 1){
        status = 'complete'
    } 

    const className = `sub-task ${props.priority}`
    const statusClass = `task-button status-button ${status}`
    return(
        <div className={className}>
            <div className='task-data'>
                <div className='top-row'>
                    <div className='main-info'>
                        <div className ={status}>
                            <button className={statusClass}onClick={changeTaskStatus}>{statusButtonValue}</button>
                            <div className='line-through' onClick={changeTaskStatus}></div>
                        </div>
                        <h2>{props.subTask2.task_name}</h2>
                    </div>
                    
                    <div className='time-frames'>
                        <p>Start: {props.subTask2.created}</p>
                        <p>Finish: {props.subTask2.complete_by}</p>
                    </div>
                </div>
                

                

                
                <p className='description'>{props.subTask2.task_description}</p>
                <div className ='bottom-row'>
                
                    <div></div>
                    <button className='task-button'onClick={toggleHiddenEdit}>{editButtonValue}</button>
                    
                </div>
                

                
            </div>
            <UpdateSubTask2Form hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task} subTask={props.subTask} subTask2={props.subTask2}/>
        </div>
    )
}

export default Task