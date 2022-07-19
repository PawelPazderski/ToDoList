import React from "react";
import './mybutton.scss'

const MyButton = ({text, before, task, option}) => {

    return (
        <>
            <div className="button-box">
                <button className={before ? "my-button" : "my-button my-button-add"} onClick={task}>
                    {text}
                    {option ? <span>(optional)</span> : null}
                    </button>
                <span className="step-info">{before}</span>
            </div>
            
        </>
    )
}

export default MyButton;