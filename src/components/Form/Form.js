import React, {useState} from 'react'

import MyButton from './../MyButton'

import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/src/sweetalert2.js'
import flatpickr from "flatpickr";
import 'flatpickr/dist/themes/airbnb.css'
import { getAllByPlaceholderText } from '@testing-library/react';


const Form = ({handleAddTask}) => {
    const [task, setTask] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')
    const [text, setText] = useState('')
    const [level, setLevel] = useState("")
    const [time, setTime] = useState("")

    const clearForm = () => {
        setTask('')
        setDeadline('')
        setPriority('')
    }

    const addSweetTask = () => {
        // console.log('dupa')
        ( async () => {
            const { value: text } = await Swal.fire({
                input: 'text',
                inputLabel: 'Task description',
                inputPlaceholder: 'Enter the task here',
                inputAttributes: {
                    'aria-label': 'Enter the task here'
                },
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'You need to write something!'
                    }
                }
                })
                
                if (text) {
                setTask(text)
                // Swal.fire(text)
                }

        })()
    }

    const addSweetLevel = () => {

        ( async () => {
            const { value: level } = await Swal.fire({
                title: 'Select priority level',
                input: 'select',
                inputOptions: {
                    'Priority': {
                        low: 'Low',
                        medium: 'Medium',
                        high: 'High'
                    }
                },
                inputPlaceholder: 'Choose from list below',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value) {
                        resolve()
                        } else {
                        resolve('You need to select something')
                        }
                    })
                    }
                })
                
                if (level) {
                setPriority(level)
                // Swal.fire(`You selected: ${level}`)
                }


        })()
    }

    const addSweetDate = () => {
        let flatpickrInstance

        Swal.fire({
            title: 'Please set the task deadline',
            html: '<input class="swal2-input" placeholder="Click here to open calendar" id="expiry-date">',
            stopKeydownPropagation: false,
            preConfirm: () => {
            if (flatpickrInstance.selectedDates[0] < new Date()) {
                Swal.showValidationMessage(`The task date can't be in the past`)
            } else if (flatpickrInstance.selectedDates[0]) {
                const date = flatpickrInstance.selectedDates[0].toLocaleDateString()
                // console.log(flatpickrInstance)
                setDeadline(date)
            } else if (!flatpickrInstance.selectedDates[0]) {
                Swal.showValidationMessage(`Please set the deadline for the task`)
            }
            },
            willOpen: () => {
            flatpickrInstance = flatpickr(
                Swal.getPopup().querySelector('#expiry-date')
            )
            }
        })
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
        }

    return (
        <div className="form-container">
            {/* <form onSubmit={e => handleAddTask(e, task, deadline, priority, clearForm)}>
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
            </form> */}
            <div className="task-set-buttons">
                <div>
                    <MyButton text="Task" before={1} task={addSweetTask} />
                    <p className="task-summary task-summary-left">{task}</p>
                </div>
                <div>
                    <MyButton text="Priority" before={2} task={addSweetLevel} />
                    <p className="task-summary">{capitalizeFirstLetter(priority)}</p>
                </div>
                <div>
                <MyButton text="DeadLine" before={3} task={addSweetDate}/>
                    <p className="task-summary task-summary-right">{deadline}</p>
                </div>
                
                
                
                {/* <MyButton text="ADD TASK" before={4} task={e => handleAddTask(e, task, deadline, priority, clearForm)}/> */}
                {(task && priority && deadline) && <MyButton text="ADD TASK" task={e => handleAddTask(e, task, deadline, priority, clearForm)}/>}


                {/* <button onClick={addSweetTask}>Task</button>
                <button onClick={addSweetLevel}>Priority</button>
                <button onClick={addSweetDate}>Deadline</button> */}
            </div>
            
            {/* <button onClick={e => handleAddTask(e, task, deadline, priority, clearForm)}>ADD TASK</button> */}
            
        </div>
    )
}

export default Form