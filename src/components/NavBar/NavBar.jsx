import React from 'react'
import cl from './style.module.css'

const NavBar = () => {
    return (
        <nav>
            <div className={cl.nav__wraper}>
                <h1>
                    TODO List Demo App
                </h1>
            </div>
        </nav>
    )
}

export default NavBar
