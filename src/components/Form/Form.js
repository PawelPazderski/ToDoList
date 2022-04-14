import React, {useState} from 'react'

const Form = ({handleAddTask}) => {
    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')

    const clearForm = () => {
        setTask('')
        setDeadline('')
        setPriority('')
    }


    return (
        <div className="form-container">
            <form onSubmit={e => handleAddTask(e, task, deadline, priority, clearForm)}>
                <label>Task to do</label>
                <input type='text' value={task} placeholder='Type in the task' onChange={e => setTask(e.target.value)}></input>
                <label>Priority</label>
                <select value={priority} placeholder='Priority' onChange={e => setPriority(e.target.value)}>
                    <option disabled>Set priority</option>
                    <option disabled hidden></option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
                <label>Deadline</label>
                <input onFocus={e => e.target.type="date"} onBlur={e => e.target.type='text'} placeholder="dd/mm/yyyy" value={deadline} onChange={e => setDeadline(e.target.value)}></input>
                <br/>
                <button type='submit'>Add task</button>
            </form>
            
        </div>
    )
}

export default Form