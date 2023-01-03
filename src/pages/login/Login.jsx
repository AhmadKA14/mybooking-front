import "./login.css"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { axiosInstance } from "../../config.js"
import Navbar from "../../components/navbar/Navbar"

export const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axiosInstance.post("/auth/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response })
        }
    }

    let errMsg = ""
    if (error?.status === 404) { errMsg = "Invalid Credentials" }
    else { errMsg = "Please provide pass and email" }

    return (
        <>
            <Navbar />
            <div className="login">
                <div className="loginContainer">
                    <input
                        type="text"
                        placeholder="username"
                        id="username"
                        onChange={handleChange}
                        className="loginInput" />
                    <input
                        type="password"
                        placeholder="password"
                        id="password"
                        onChange={handleChange}
                        className="loginInput" />
                    <button disabled={loading} onClick={handleClick} className="loginBtn">Login</button>
                    {error && <span>{errMsg}</span>}
                </div>
            </div>
        </>
    )
}

export default Login