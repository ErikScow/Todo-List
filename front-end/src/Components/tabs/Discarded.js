import React from 'react'

import TaskContainer from '../task/TasksContainer'

const Discarded = () => {
    return(
        <div>
            <TaskContainer status={2}/>
        </div>
    )
}

export default Discarded