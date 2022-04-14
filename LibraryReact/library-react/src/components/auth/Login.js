import {useContext, useState} from "react";
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router";
import {userContext} from "../../contexts/UserContext";

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [userDetails, setUserDetails] = useContext(userContext);

    const navigate = useNavigate()

    const loginHandler = event => {
        event.preventDefault();
        AuthService.login(username, password).then(() => {
                setUserDetails({"logged":"true"});
                navigate("/profile");
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    }
    return (
        <form onSubmit={loginHandler}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input value="Login" type="submit"/>
            {message}
        </form>
    )
}

export default Login;