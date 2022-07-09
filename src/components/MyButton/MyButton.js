import React from "react";
import './mybutton.scss'

const MyButton = ({text, before, task}) => {

    return (
        <>
            <div className="button-box">
                <button className={before ? "my-button" : "my-button my-button-add"} onClick={task}>{text}</button>
                <span className="step-info">{before}</span>
            </div>
            
        </>
    )
}

export default MyButton;