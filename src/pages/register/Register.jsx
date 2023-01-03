import "./register.css"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { axiosInstance } from "../../config.js"
import Navbar from "../../components/navbar/Navbar"

export const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "REGISTER_START" })
        try {
            const res = await axiosInstance.post("/auth/register", credentials)
            dispatch({ type: "REGISTER_SUCCESS", payload: res.data })
            navigate("/login")
        } catch (error) {
            console.log(error);
            dispatch({ type: "REGISTER_FAILURE", payload: error.response })
        }
    }

    let errMsg = ""
    if (error?.status === 400) { errMsg = "Please enter valid email" }
    else { errMsg = "Username or email already in use" }

    return (
        <>
            <Navbar />
            <div className="register">
                <div className="regContainer">
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        className="regInput" />
                    <input
                        type="text"
                        placeholder="email"
                        id="email"
                        onChange={handleChange}
                        className="regInput" />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="regInput" />
                    <button disabled={loading} onClick={handleClick} className="regBtn">Regsiter</button>
                    {error && <span>{errMsg}</span>}
                </div>
            </div>
        </>
    )
}

export default Register