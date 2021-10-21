import React from 'react'
import cl from "./style.module.css"

const Modal = ({ children, visible }) => {
    
    const rootClasses = [cl.myModal];
    if(visible){
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(" ")}>
            {children}
        </div>
    )
}

export default Modal
