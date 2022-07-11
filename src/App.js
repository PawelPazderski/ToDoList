import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import DragNDrop from './components/DragNDrop';
import Home from './components/Home';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2'

function App() {
  const [itemsToDo, setItemsToDo] = useState([])
  const [columns, setColumns] = useState({
    col1: {
      name: 'To do',
      items: []
    },
    col2: {
      name: 'In progress',
      items: []
    },
    col3: {
      name: 'Done',
      items: []
    }
  }
  )

  useEffect(()=> {
    const colsFromLocal = localStorage.getItem("cols")
    if (!colsFromLocal) {
      return
    }
    setColumns(JSON.parse(colsFromLocal))
  },[])

  useEffect(()=> {
    // localStorage.clear()
    const colsFromLocal = localStorage.getItem("cols")
    localStorage.setItem("cols", JSON.stringify(columns))
  },[columns])

  const addTask = (e, task, deadline, priority, clearForm) => {
    e.preventDefault()
    if (task && priority && deadline) {

      setColumns(prev=> ({

        ...prev, 
        col1: {name: 'To do', items: [...prev.col1.items, {id: uuidv4(), content: {task, deadline, priority}}]}}))
      clearForm()
      Swal.fire({
        icon: 'success',
        title: 'Added new task',
        text: `Task: ${task} / Priority: ${priority.toLowerCase()} / Deadline: ${deadline}`,
        showConfirmButton: false,
        timer: 2500
      })

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need task, priority and deadline to add a task.',
      })
    }

  }

  const refreshData = (data) => {
    setColumns(data)
    setItemsToDo(data.col1.items)
  }
  
  return (
    <div className="App">
      <Form handleAddTask={addTask}/>
      <DragNDrop columnsDB={columns} itemsDB={itemsToDo} refreshData={refreshData} />
      <Home />
    </div>
  );
}

export default App;
