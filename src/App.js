import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import DragNDrop from './components/DragNDrop';
import Footer from './components/Footer';
import {v4 as uuidv4} from 'uuid';
import Swal from 'sweetalert2'

function App() {
  const [itemsToDo, setItemsToDo] = useState([])
  const [time, setTime] = useState(Date.now())
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

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);


  useEffect(()=> {
    // localStorage.clear()
    // const colsFromLocal = localStorage.getItem("cols")

    localStorage.setItem("cols", JSON.stringify(columns))

  },[columns])

  const addTask = (e, task, deadline, priority, addInfo, clearForm) => {
    e.preventDefault()
    if (task && priority && deadline) {

      setColumns(prev=> ({

        ...prev, 
        col1: {name: 'To do', items: [...prev.col1.items, {id: uuidv4(), content: {task, deadline, priority, addInfo}}]}}))
      clearForm()
      Swal.fire({
        icon: 'info',
        title: 'Added new task',
        background: 'rgba(21, 60, 151, 0.8)',
        color: "white",
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
      <DragNDrop 
          columnsDB={columns} 
          itemsDB={itemsToDo} 
          refreshData={refreshData} />
      <Footer />
    </div>
  );
}

export default App;
