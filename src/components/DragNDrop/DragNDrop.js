import React, {useState, useEffect} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Swal from 'sweetalert2'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss';

const DragNDrop = ({columnsDB, refreshData}) => {
    const [columns, setColumns] = useState(columnsDB);

    useEffect(()=> {
        setColumns(columnsDB)

    }, [columnsDB])

    useEffect(()=> {
        if(columns !== columnsDB){
            refreshData(columns)
        }

    }, [columns])

    const onDragEnd = (result, columns, setColumns) => {
        // console.log(result)
        
        if(!result.destination) return;
        const { source, destination } = result
        if(source.droppableId !== destination.droppableId) {
            // console.log(destination.droppableId)
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination.droppableId]
            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination.index, 0, removed)
            // console.log(sourceColumn)
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
            // localStorage.setItem("cols", JSON.stringify(columns))

        } else {
            const column = columns[source.droppableId]
            const copiedItems =[...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)
            setColumns({
                ...columns,
                [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
        // localStorage.setItem("cols", JSON.stringify(columns))

        }
    }

    const removeItem = (e) => {
        const elToDelete = e.currentTarget.parentElement
        const filtered = columns.col3.items.filter(el => el.id !== elToDelete.dataset.rbdDraggableId )

        let text = "Czy na pewno chesz usunąć zadanie?"

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Deleted!',
                'The task has been deleted.',
                'success'
                )

                columns.col3.items.filter(el => console.log(el.id) )
                setColumns({
                    ...columns,
                    "col3" : {
                    ...columns.col3,
                    items: filtered
            }
        })
            }
            })

        
        
    }


    return (
    <div className='drag-n-drop'>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
                // {console.log(columns)}
                return (
                    
                    <div key={id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h2 className="column-title">{column.name}</h2>
                        <div style={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'rgba(66, 112, 220, 0.8)' : 'rgba(211, 211, 211, 0.8)',
                                            borderRadius: 10,
                                            overflowX: "hidden",
                                            overflowY: "auto",
                                            padding: 10,
                                            width: 250,
                                            height: 500
                                        }}
                                    >
                                        {/* {console.log(columns)} */}
                                        {column.items.map((item, index) => {
                                            return (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                    droppableId={id}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                className="draggable-div"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: 'none',
                                                                    padding: 16,
                                                                    borderRadius: 4,
                                                                    boxShadow: snapshot.isDragging ? "2px 15px 5px rgba(0, 0, 0, 0.1)" : "none",
                                                                    margin: '0 0 8px 0',
                                                                    minHeight: '50px',
                                                                    backgroundColor: snapshot.isDragging ? 'rgba(21, 60, 151, 0.8)' : 'rgba(66, 112, 220, 0.8)',
                                                                    color: 'white',
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                            <p>{item.content.task}</p>
                                                            <p>{item.content.deadline} / {item.content.priority}</p>
                                                            {(column.name === "Done") && <button className="delete-btn" onClick={e => removeItem(e)}>DELETE</button>}
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )
                            }}
                        </Droppable>
                        </div>
                        
                    </div>
                )
            })}
        </DragDropContext>
    </div>
    )
    }

export default DragNDrop