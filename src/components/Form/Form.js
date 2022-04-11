import React, {useState} from 'react'

const Form = ({handleAddTask}) => {
    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')


    return (
        <div>
            <form onSubmit={e => handleAddTask(e, task, deadline, priority)}>
                <input type='text' value={task} placeholder='Task to do' onChange={e => setTask(e.target.value)}></input>
                <select value={priority} placeholder='Priority' onChange={e => setPriority(e.target.value)}>
                    <option disabled></option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <input type='date' value={deadline} placeholder='Deadline' onChange={e => setDeadline(e.target.value)}></input>
                <button type='submit'>Set task</button>
            </form>
            
        </div>
    )
}

export default Form