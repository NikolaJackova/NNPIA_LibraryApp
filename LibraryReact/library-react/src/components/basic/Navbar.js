import {Link} from "react-router-dom";
import AuthService from "../../services/AuthService";
import {useContext, useEffect, useState} from "react";
import {userContext} from "../../contexts/UserContext";

function Navbar() {
    const [currentUser] = useState(AuthService.getCurrentUser());
    const [userDetails, setUserDetails] = useContext(userContext);

    const logOutHandler = () => {
        AuthService.logout();
        setUserDetails({"logged":"false"});
    }

    return (
        <div>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            {currentUser ? (
                <div>
                    <li>
                        <Link to={"/profile"}>{currentUser.username}</Link>
                    </li>
                    <li>
                        <Link to={"/login"} onClick={logOutHandler}>Log out</Link>
                    </li>
                </div>
            ) : (
                <div>
                    <li>
                        <Link to={"/login"} >Log in</Link>
                    </li>
                    <li>
                        <Link to={"/register"}>Register</Link>
                    </li>
                </div>
            )}
        </div>
    )
}

export default Navbar;