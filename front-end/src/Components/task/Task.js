import React, { useState, useContext, useEffect } from 'react'

import { UserContext } from '../../contexts/UserContext'

import SubTask from './SubTask'
import CreateSubTaskForm from './task-forms/CreateSubTaskForm'
import UpdateTaskForm from './task-forms/UpdateTaskForm'

import axiosWithAuth from '../../axiosWithAuth'

import backendUrl from '../../backendurl'


const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hiddenEdit, setHiddenEdit] = useState(true)
    const [hidden, setHidden] = useState(true)
    const [hideCompleted, setHideCompleted] = useState(true)

    const [CreateButtonValue, setCreateButtonValue] = useState('Add a sub task')
    const [editButtonValue, setEditButtonValue] = useState('Edit')
    const [statusButtonValue, setStatusButtonValue] = useState('')
    const [discardButtonValue, setDiscardButtonValue] = useState('')
    const [hideCompletedButton, setHideCompletedButton] = useState('Show Completed Sub Tasks')

    const changeTaskStatus = () => {
        let update = {}
        if (props.task.status === 0){
            update.status = 1
        } else if (props.task.status === 1){
            update.status = 0
        }
        
        axiosWithAuth().put(`${backendUrl}/api/users/${userData.id}/tasks/${props.task.id}`, update)
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
                console.log(err)
            })
    }

    const discardTask = () => {

        let update = {}
        if (props.task.status === 2){
            update.status = 0
        } else{
            update.status = 2
        }
        
        axiosWithAuth().put(`${backendUrl}/api/users/${userData.id}/tasks/${props.task.id}`, update)
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
        if(props.task.status === 0){
            setStatusButtonValue('Finish Task')
        } else if (props.task.status === 1){
            setStatusButtonValue('Not Finished')
        } else {
            setStatusButtonValue(null)
        }
    }, [])

    useEffect(() => {
        if (props.task.status === 2){
            setDiscardButtonValue('Set Active')
        } else {
            setDiscardButtonValue('Discard Task')
        }
    }, [])
    
    let status = ''
    if(props.task.status === 0 ){
        status = 'incomplete'
    } else if (props.task.status === 1){
        status = 'complete'
    } 
    const className = `task ${props.priority}`
    const statusClass = `task-button status-button ${status}`
    const titleContainer = `title-container ${status}`
    if (props.task.status === 2){
        return(
            <div className={className}>
                <div className='task-data'>
                <div className='top-row'>
                    <div className='main-info'>
                        <h3 className='discarded-h3'>{props.task.task_name}</h3>
                    </div>
                    
                    <div className='time-frames'>
                        <p>Start: {props.task.created}</p>
                        <p>Finish: {props.task.complete_by}</p>
                    </div>
                </div>
                

                

                
                <p className='description'>{props.task.task_description}</p>
                <div className ='bottom-row'>
                <button className='task-button create-sub-task-button'onClick={toggleHidden}>{CreateButtonValue}</button>
                    <div className='secondary-buttons'>
                        <button className='task-button'onClick={discardTask}>{discardButtonValue}</button>
                        <button className='task-button'onClick={toggleHiddenEdit}>{editButtonValue}</button>
                    </div>
                </div>
                

                
            </div>
                <CreateSubTaskForm taskId ={props.task.id} hidden={hidden} toggleHidden={toggleHidden}/>
                <UpdateTaskForm hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task}/>
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 2 && subTask.status === 0){
                            return <SubTask priority='high-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 1 && subTask.status === 0){
                            return <SubTask priority='mid-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 0 && subTask.status === 0){
                            return <SubTask priority='low-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                <button className='task-button hide-completed-button'onClick={toggleHideCompleted}>{hideCompletedButton}</button>
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.status === 1 && hideCompleted === false){
                            return <SubTask priority='completed-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
            </div>
        )
    } else {
        return(
            <div className={className}>


            <div className='task-data'>
                <div className='top-row'>
                    <div className='main-info'>
                        <div className ={status}>
                            <button className={statusClass}onClick={changeTaskStatus}>{statusButtonValue}</button>
                        </div>
                        <h3>{props.task.task_name}</h3>
                    </div>
                    
                    <div className='time-frames'>
                        <p>Start: {props.task.created}</p>
                        <p>Finish: {props.task.complete_by}</p>
                    </div>
                </div>
                

                

                
                <p className='description'>{props.task.task_description}</p>
                <div className ='bottom-row'>
                <button className='task-button create-sub-task-button'onClick={toggleHidden}>{CreateButtonValue}</button>
                    <div className='secondary-buttons'>
                        <button className='task-button'onClick={discardTask}>{discardButtonValue}</button>
                        <button className='task-button'onClick={toggleHiddenEdit}>{editButtonValue}</button>
                    </div>
                </div>
                

                
            </div>
                
                
                
                <CreateSubTaskForm taskId ={props.task.id} hidden={hidden} toggleHidden={toggleHidden}/>
                <UpdateTaskForm hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task}/>
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 2 && subTask.status === 0){
                            return <SubTask priority='high-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 1 && subTask.status === 0){
                            return <SubTask priority='mid-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.priority === 0 && subTask.status === 0){
                            return <SubTask priority='low-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
                <button className='task-button hide-completed-button'onClick={toggleHideCompleted}>{hideCompletedButton}</button>
                {
                    props.task.subTasks.map((subTask, i) => {
                        if (subTask.status === 1 && hideCompleted === false){
                            return <SubTask priority='completed-priority' key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                        }
                    })
                }
            </div>
        )
    }
}

export default Task