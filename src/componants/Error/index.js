import React from 'react'
import './error_css.css'
import { NavLink } from 'react-router-dom'
function Error() {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                        <h2>Page not found</h2>
                    </div>
                    <NavLink to="/">Homepage</NavLink>
                </div>
            </div>



        </>

    )
}

export default Error