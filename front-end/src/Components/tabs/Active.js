import React, { useEffect, useState } from 'react'
import TasksContainer from '../task/TasksContainer'

import CreateTaskForm from '../task/task-forms/CreateTaskForm'

const Active = () => {

    const [hidden, setHidden] = useState(true)
    const [buttonValue, setButtonValue] = useState('Add a task')

    const toggleHidden = () => {
        if (hidden){
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    useEffect(() => {
        if(hidden){
            setButtonValue('Add a task')
        } else {
            setButtonValue('Cancel')
        }
    }, [hidden])
    
    return(
        <div>active
            <button onClick={toggleHidden}>{buttonValue}</button>
            <CreateTaskForm hidden={hidden} toggleHidden={toggleHidden}/>
            <TasksContainer status={0}/>
        </div>
    )
}

export default Active