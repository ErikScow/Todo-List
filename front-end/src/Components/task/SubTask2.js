import React, { useState, useContext, useEffect } from 'react'
import axiosWithAuth from '../../axiosWithAuth'

import { UserContext } from '../../contexts/UserContext'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    const[statusButtonValue, setStatusButtonValue] = useState('Finish Task')

    const changeTaskStatus = () => {
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

    useEffect(() => {
        if(props.subTask2.status === 0){
            setStatusButtonValue('Finish Task')
        } else if (props.subTask2.status === 1){
            setStatusButtonValue('Not Finished')
        } else {
            setStatusButtonValue(null)
        }
    }, [props.subTask2.status])

    return(
        <div className="sub-task">
            <button onClick={changeTaskStatus}>{statusButtonValue}</button>
            <h5>{props.subTask2.task_name}</h5>
        </div>
    )
}

export default Task