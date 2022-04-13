import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import DragNDrop from './components/DragNDrop';
import {v4 as uuidv4} from 'uuid';

const itemsFromBackEnd = [
  {id: uuidv4(), content: 'First task'},
  {id: uuidv4(), content: 'Second task'}
];

const columnsFromBackEnd = {
    [uuidv4()]: {
      name: 'To do',
      items: []
    },
    [uuidv4()]: {
      name: 'In progress',
      items: []
    },
    [uuidv4()]: {
      name: 'Done',
      items: []
    }
  };


function App() {
  const [itemsToDo, setItemsToDo] = useState([])
  const [itemsInProgress, setItemsInProgress] = useState([])
  const [itemsDone, setItemsDone] = useState([])
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

  const addTask = (e, task, deadline, priority, clearForm) => {
    e.preventDefault()
    setItemsToDo(prev => [...prev, {id: uuidv4(), content: {task, deadline, priority}}])
    clearForm()
    
  }

  const refreshData = (data) => {
    setColumns(data)
    setItemsToDo(data.col1.items)
  }
  

  useEffect(()=>{
    setColumns(prev=> ({
      ...prev, 
      col1: {name: 'To do', items: itemsToDo}}))
  }, [itemsToDo])



  return (
    <div className="App">
      <Form handleAddTask={addTask}/>
      <DragNDrop columnsDB={columns} itemsDB={itemsToDo} refreshData={refreshData} />
    </div>
  );
}

export default App;
