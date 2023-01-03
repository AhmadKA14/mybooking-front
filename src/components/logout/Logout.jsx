import "./logout.css"
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Logout = () => {
    const { user, dispatch } = useContext(AuthContext)


    const handleClick = (e) => {
        e.preventDefault()
        dispatch({ type: "LOGOUT" })
    }

    return (
        <button onClick={handleClick} className='logout'>Logout</button>
    )
}

export default Logout