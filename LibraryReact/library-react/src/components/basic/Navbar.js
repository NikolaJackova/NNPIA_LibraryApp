import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../contexts/UserContext";

function Navbar() {
    const [currentUser] = useState(AuthService.getCurrentUser());
    const [userDetails, setUserDetails] = useContext(userContext);

    const logOutHandler = () => {
        AuthService.logout();
        setUserDetails({"logged": "false"});
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link className="navbar-brand" to={"/"}>Library App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <Link class="nav-link" to={"/"}>Home</Link>
                    {currentUser ? (
                        <>
                            <Link class="nav-link" to={"/libraries"}>Libraries</Link>
                            <Link class="nav-link" to={"/profile"}>{currentUser.username}</Link>
                            <Link class="nav-link" to={"/login"} onClick={logOutHandler}>Log out</Link>
                        </>
                    ) : (
                        <>
                            <Link class="nav-link" to={"/login"}>Log in</Link>
                            <Link class="nav-link" to={"/register"}>Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;