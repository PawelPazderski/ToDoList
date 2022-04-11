import React, {useState} from 'react'

const DragNDrop = ({data}) => {
    const [list, setList] = useState(data);

    const handleDragStart = (e) => {
        console.log("drag starting...")

    }

    return (
    <div className='drag-n-drop'>
            {list.map((grp, grpI) => (
            <div key={grp.title} className="dnd-group">
                <div className='group-title'>{grp.title}</div>
                {grp.items.map((item, itemI) => (
                <div draggable onDragStart={handleDragStart} key={item} className="dnd-item">
                    {item}
                </div>
                ))}
            </div>
            ))}
        </div>
    )
}

export default DragNDrop