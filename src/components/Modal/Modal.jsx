import React from 'react'
import "./style.css"

const Modal = ({ children }) => {

    return (
        <div className="myModal">
            {children}
        </div>
    )
}

export default Modal
