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

  const addTask = (e, task, deadline, priority) => {
    e.preventDefault()
    setItemsToDo(prev => [...prev, {id: uuidv4(), content: {task, deadline, priority}}])
    
  }

  // const moveItem = (drop, result, drag) => {
  //   console.log(drop, result, drag)
  //   let movedItem

  //   if( result.source.index === 0 ) {
  //     movedItem = itemsToDo.filter(el => el.id === drag).pop()
  //     console.log(movedItem)
  //     setItemsToDo(prev => prev.filter(el => el.id !== drag))
  //   }
  //   if( result.source.index === 1 ) {
  //     movedItem = itemsInProgress.filter(el => el.id === drag).pop()
  //     setItemsInProgress(prev => prev.filter(el => el.id !== drag))

  //   }
  //   if( result.source.index === 2 ) {
  //     movedItem = itemsDone.filter(el => el.id === drag).pop()
  //     setItemsDone(prev => prev.filter(el => el.id !== drag))
  //   }
  //   if (drop === 'col1') {
  //     setItemsToDo(prev => [...prev, movedItem])
  //     setColumns(prev=> ({...prev, col1: { name: 'To do', items: itemsToDo } }))
  //   }
  //   if (drop === 'col2') {
  //     setItemsInProgress(prev => [...prev, movedItem])
  //     setColumns(prev=> ({...prev, col2: { name: 'In progress', items: itemsInProgress } }))
  //   }
  //   if (drop === 'col3') {
  //     setItemsDone(prev => [...prev, movedItem])
  //     setColumns(prev=> ({...prev, col3: { name: 'Done', items: itemsDone } }))
  //   }

  // }

  useEffect(()=>{
    setColumns(prev=> ({
      ...prev, 
      col1: {name: 'To do', items: itemsToDo}}))
  }, [itemsToDo])

  useEffect(()=>{
    setColumns(prev=> ({
      ...prev, 
      col2: {name: 'In progress', items: itemsInProgress}
      }))
  }, [itemsInProgress])

  useEffect(()=>{
    setColumns(prev=> ({
      ...prev, 
      col3: {name: 'Done', items: itemsDone}}))
  }, [itemsDone])

  

  

  return (
    <div className="App">
      <Form handleAddTask={addTask}/>
      <DragNDrop columnsDB={columns} itemsDB={itemsToDo} />
    </div>
  );
}

export default App;
