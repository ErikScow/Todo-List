import React from 'react'
import TasksContainer from '../task/TasksContainer'

const Active = () => {
    return(
        <div>active
            <TasksContainer status={0}/>
        </div>
    )
}

export default Active