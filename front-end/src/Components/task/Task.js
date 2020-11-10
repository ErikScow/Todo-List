import React, { useState, useContext, useEffect } from 'react'

import { UserContext } from '../../contexts/UserContext'

import SubTask from './SubTask'
import CreateSubTaskForm from './task-forms/CreateSubTaskForm'
import UpdateTaskForm from './task-forms/UpdateTaskForm'

import axiosWithAuth from '../../axiosWithAuth'


const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hiddenEdit, setHiddenEdit] = useState(true)
    const [hidden, setHidden] = useState(true)
    const [CreateButtonValue, setCreateButtonValue] = useState('Add a sub task')
    const [editButtonValue, setEditButtonValue] = useState('Edit')
    const [statusButtonValue, setStatusButtonValue] = useState('')
    const [discardButtonValue, setDiscardButtonValue] = useState('')

    const changeTaskStatus = () => {
        let update = {}
        if (props.task.status === 0){
            update.status = 1
        } else if (props.task.status === 1){
            update.status = 0
        }
        
        axiosWithAuth().put(`http://localhost:5000/api/users/${userData.id}/tasks/${props.task.id}`, update)
            .then((res) => {
                
                console.log(res)

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
        
        axiosWithAuth().put(`http://localhost:5000/api/users/${userData.id}/tasks/${props.task.id}`, update)
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

    if (props.task.status === 2){
        return(
            <div className="task">
                <button onClick={discardTask}>{discardButtonValue}</button>
                <h3>{props.task.task_name}</h3>
                <button onClick={toggleHidden}>{CreateButtonValue}</button>
                <button onClick={toggleHiddenEdit}>{editButtonValue}</button>
                <CreateSubTaskForm taskId ={props.task.id} hidden={hidden} toggleHidden={toggleHidden}/>
                <UpdateTaskForm hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task}/>
                {
                    props.task.subTasks.map((subTask, i) => {
                        return <SubTask key={i} subTask={subTask} taskId ={props.task.id} task={props.task}/>
                    })
                }
            </div>
        )
    } else {
        return(
            <div className="task">
                <button onClick={changeTaskStatus}>{statusButtonValue}</button>
                <button onClick={discardTask}>{discardButtonValue}</button>
                <h3>{props.task.task_name}</h3>
                <button onClick={toggleHidden}>{CreateButtonValue}</button>
                <button onClick={toggleHiddenEdit}>{editButtonValue}</button>
                <CreateSubTaskForm taskId ={props.task.id} hidden={hidden} toggleHidden={toggleHidden}/>
                <UpdateTaskForm hiddenEdit={hiddenEdit} toggleHiddenEdit={toggleHiddenEdit} task={props.task}/>
                {
                    props.task.subTasks.map((subTask, i) => {
                        return <SubTask key={i} subTask={subTask} taskId = {props.task.id} task = {props.task}/>
                    })
                }
            </div>
        )
    }
}

export default Task