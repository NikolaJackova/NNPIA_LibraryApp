import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {useContext, useState} from "react";
import {userContext} from "../../contexts/UserContext";

function Navbar() {
    const [currentUser] = useState(AuthService.getCurrentUser());
    const [value, setValue] = useContext(userContext);

    const logOutHandler = () => {
        AuthService.logout();
        setValue(undefined);
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={"/"}>Library App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <Link className="nav-link" to={"/"}>Home</Link>
                    {value ? (
                        <>
                            <Link className="nav-link" to={"/libraries"}>Libraries</Link>
                            {currentUser.authorities.some(item => item.authority === "ADMIN") && <Link className="nav-link" to={"/genres"}>Genres</Link>}
                            <Link className="nav-link" to={"/profile"}>{currentUser.username}</Link>
                            <Link className="nav-link" to={"/login"} onClick={logOutHandler}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link className="nav-link" to={"/login"}>Log in</Link>
                            <Link className="nav-link" to={"/register"}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;