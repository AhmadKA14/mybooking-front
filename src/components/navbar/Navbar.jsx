import "./navbar.css"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Logout from "../logout/Logout"

const Navbar = () => {
    const { user } = useContext(AuthContext)
    console.log(user?.details.username);

    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                    <span className="logo">MyBooking</span>
                </Link>
                {user ?
                    <div>
                        {user?.details.username}
                        <Logout />
                    </div>
                    : <div className="navItems">
                        <button onClick={() => navigate("/register")} className="navButton">Register</button>
                        <button onClick={() => navigate("/login")} className="navButton">Sign in</button>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar