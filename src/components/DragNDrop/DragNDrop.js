import React, {useState, useEffect} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Swal from 'sweetalert2'

import FormDialog from '../../FormDialog/FormDialog';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const DragNDrop = ({columnsDB, refreshData}) => {
    const [columns, setColumns] = useState(columnsDB);

    useEffect(()=> {
        setColumns(columnsDB)
    }, [columnsDB])

    useEffect(()=> {
        if(columns !== columnsDB){
            refreshData(columns)
        }
    }, [columns]);

    const msToTime = (seconds) => {
        seconds = Number(seconds);
        const d = Math.floor(seconds / (3600*24));
        const h = Math.floor(seconds % (3600*24) / 3600);
        const m = Math.floor(seconds % 3600 / 60);
        const s = Math.floor(seconds % 60);

        const dDisplay = d > 0 ? d + (d === 1 ? " day " : " days ") : "";
        const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
        // var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        const mDisplay = m > 0 ? minTwoDigits(m) + " min " : "";
        // var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        const sDisplay = minTwoDigits(s) + "sec"

        // return dDisplay + hDisplay + mDisplay + sDisplay;
        return dDisplay + hDisplay + mDisplay;
    }

    const minTwoDigits = (n) => {
        return (n < 10 ? '0' : '') + n;
    }
    

    const daysLeft = (item) => {
        const {deadline} = item.content;
        const deadlineForNewDate = deadline.split(".").reverse().join("-")
        let date1 = new Date(deadlineForNewDate)
        let date2 = new Date()

        const diffTime = date1.getTime() - date2.getTime()
        // const daysTotal = Math.ceil(diffTime / (1000))
        const seconds = diffTime / 1000
        const daysTotal = Math.ceil(diffTime / (1000*3600*24))

        if (daysTotal <= 3 && daysTotal > 0) {
            return <span style={{color: "pink"}}>{msToTime(seconds)}</span>
        } else if (daysTotal <= 0) {
            return <span style={{color: "pink"}}>Deadline exceeded</span>
        } else {
            return <span style={{display: "none"}}>{msToTime(seconds)}</span>
        }
        }
        
    const onDragEnd = (result, columns, setColumns) => {
        
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

    const removeItem = (e) => {
        const elToDelete = e.currentTarget.parentElement
        const filtered = columns.col3.items.filter(el => el.id !== elToDelete.dataset.rbdDraggableId )

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            background: 'rgba(21, 60, 151, 0.8)',
            color: "white",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The task has been deleted.',
                    icon: 'info',
                    background: 'rgba(21, 60, 151, 0.8)',
                    color: "white",
                }
                )
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

    const showDetails = (item) => {
        const timeLeft = daysLeft(item)

        console.log(timeLeft.props.children)

        if (item.content.addInfo.length) {
            Swal.fire({
                title: 'More details:',
                text: `${item.content.addInfo}`,
                footer: `Time left: ${timeLeft.props.children}`,
                background: 'rgba(21, 60, 151, 0.8)',
                color: "white",
            })
        } else {
            Swal.fire({
                title: 'More details:',
                text: "No additional description",
                footer: `Time left: ${timeLeft.props.children}`,
                // footer: `${timeLeft.props.children.join(" ")}`,
                background: 'rgba(21, 60, 151, 0.8)',
                color: "white",
            })
        }
    }


    return (
        <>
        <div className='drag-n-drop'>
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
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
                                                    task={item.task}
                                                    >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <>
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
                                                                    ...provided.draggableProps.style,
                                                                }}
                                                                >
                                                                <h3>{item.content.task}</h3>
                                                                <p>Deadline: {item.content.deadline}</p>
                                                                <p>Priority: {item.content.priority}</p>
                                                                <p>{daysLeft(item)}</p>
                                                                <button className="info-btn" onClick={() => showDetails(item)}>DETAILS</button>
                                                                {/* <FormDialog item={item}/> */}
                                                                {(column.name === "Done") && <button className="delete-btn" onClick={e => removeItem(e)}>DELETE</button>}
                                                            </div>
                                                            </>
                                                            
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
        </>
    )
    }

export default DragNDrop;