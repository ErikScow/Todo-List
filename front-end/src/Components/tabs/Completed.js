import React from 'react'

import TaskContainer from '../task/TasksContainer'

const Completed = () => {
    return(
        <div>completed
        <TaskContainer status={1}/>
        </div>
        
    )
}

export default Completed