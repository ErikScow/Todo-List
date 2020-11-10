import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../axiosWithAuth'

import { UserContext } from '../../contexts/UserContext'

import SubTask2 from './SubTask2'
import CreateSubTask2Form from './task-forms/CreateSubTask2Form'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const [hidden, setHidden] = useState(true)
    const [createButtonValue, setCreateButtonValue] = useState('Add a sub task')
    const [statusButtonValue, setStatusButtonValue] = useState('Finish Task')

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

    useEffect(() => {
        if(hidden){
            setCreateButtonValue('Add a sub task')
        } else {
            setCreateButtonValue('Cancel')
        }
    }, [hidden])

    useEffect(() => {
        if(props.subTask.status === 0){
            setStatusButtonValue('Finish Task')
        } else if (props.subTask.status === 1){
            setStatusButtonValue('Not Finished')
        } else {
            setStatusButtonValue(null)
        }
    }, [props.subTask.status])

    return(
        <div className="sub-task">
            <button onClick={changeTaskStatus}>{statusButtonValue}</button>
            <h4>{props.subTask.task_name}</h4>
            <button onClick={toggleHidden}>{createButtonValue}</button>
            <CreateSubTask2Form hidden={hidden} toggleHidden={toggleHidden} task={props.task} taskId={props.taskId} subTask={props.subTask} subTaskId={props.subTask.id}/>
            {props.subTask.subTasks2.map((subTask2, i) => {
                return <SubTask2 key={i} subTask={props.subTask} task={props.task} subTask2={subTask2}/>
            })}
        </div>
    )
}

export default Task