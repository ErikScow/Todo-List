import React, { useState, useContext } from 'react'

import { UserContext } from '../../contexts/UserContext'

const Task = (props) => {
    const { user } = useContext(UserContext)
    const[userData, setUserData] = user

    return(
        <div>
            <h5>{props.subTask2.sub_task_name}</h5>
        </div>
    )
}

export default Task