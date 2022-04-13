import React, {useState, useEffect} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

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
        

        }
    }


    return (
    <div className='drag-n-drop'>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
                // {console.log(columns)}
                return (
                    
                    <div key={id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        <h2>{column.name}</h2>
                        <div style={{margin: 8}}>
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                                return (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500
                                        }}
                                    >
                                        {/* {console.log(column)} */}
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
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    userSelect: 'none',
                                                                    padding: 16,
                                                                    margin: '0 0 8px 0',
                                                                    minHeight: '50px',
                                                                    backgroundColor: snapshot.isDragging ? 'purple' : '#456C86',
                                                                    color: 'white',
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                            <p>{item.content.task}</p>
                                                            <p>{item.content.deadline} / {item.content.priority}</p>
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