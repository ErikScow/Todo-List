import React, { useState, useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

import SubTask2 from './SubTask2'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    return(
        <div className="sub-task">
            <h4>{props.subTask.task_name}</h4>
            {props.subTask.subTasks2.map((subTask2, i) => {
                return <SubTask2 key={i} subTask2={subTask2}/>
            })}
        </div>
    )
}

export default Task