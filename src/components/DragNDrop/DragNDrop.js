import React, {useState, useEffect, useRef} from 'react'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import InfoList from './../InfoList'
import Swal from 'sweetalert2'

const DragNDrop = ({columnsDB, refreshData}) => {
    const [columns, setColumns] = useState(columnsDB);
    const [details, setDetails] = useState(false)
    const myItem = useRef(null)

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

        const dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
        const hDisplay = h > 0 ? h + (h === 1 ? " h " : " h ") : "";
        // var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
        const mDisplay = m > 0 ? minTwoDigits(m) + " min " : "";
        // var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
        const sDisplay = minTwoDigits(s) + "sec"

        // return dDisplay + hDisplay + mDisplay + sDisplay;
        return dDisplay + hDisplay + mDisplay;
        // return dDisplay + hDisplay;
    }

    const minTwoDigits = (n) => {
        return (n < 10 ? '0' : '') + n;
    }
    

    const daysLeft = (item) => {
        // console.log(item.content)
        const {deadline} = item.content;
        const deadlineForNewDate = deadline.split(".").reverse().join("-")
        // console.log(deadline2)
        let date1 = new Date(deadlineForNewDate)
        let date2 = new Date()

        const diffTime = date1.getTime() - date2.getTime()
        // const daysTotal = Math.ceil(diffTime / (1000))
        const seconds = diffTime / 1000
        const daysTotal = Math.ceil(diffTime / (1000*3600*24))

        if (daysTotal <= 3 && daysTotal > 0) {
            return <span style={{color: "pink"}}>Time left: {msToTime(seconds)}</span>
        } else if (daysTotal <= 0) {
            return <span style={{color: "pink"}}>deadline exceeded</span>
        } else {
            return <span style={{display: "none"}}>{msToTime(seconds)}</span>
        }
        
        }
        



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

    const showDetails = (item) => {
        console.log(item)
        const timeLeft = daysLeft(item)
        const info = [`Time left: ${timeLeft.props.children}`,`${item.content.addInfo}` ]

        console.log(timeLeft.props.children)

        if (item.content.addInfo.length) {
            Swal.fire({
                title: 'More details:',
                text: `${item.content.addInfo}`,
                footer: `${timeLeft.props.children}`,
                background: 'rgba(21, 60, 151, 0.8)',
                color: "white",
            })
        } else {
            Swal.fire({
                title: 'More details:',
                text: "No additional description",
                footer: `Time left: ${timeLeft.props.children}`,
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
                                                                    ...provided.draggableProps.style
                                                                }}
                                                                >
                                                                <h3>{item.content.task}</h3>
                                                                <p>Deadline: {item.content.deadline}</p>
                                                                <p>Priority: {item.content.priority}</p>
                                                                <p>{daysLeft(item)}</p>
                                                                {/* <p>{item.content.addInfo}</p> */}
                                                                <button className="info-btn" onClick={() => showDetails(item)}>DETAILS</button>
                                                                {/* { details && <button className="info-btn" onClick={(e) => hideDetails(e)}>HIDE DETAILS</button> } */}
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