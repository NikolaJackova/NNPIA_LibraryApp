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
                setUserDetails({"logged": "true"});
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
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" htmlFor="username">Username:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="text" name="username" value={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                </div>
            </div>
            <div class="row mb-3">
                <label class="col-sm-2 col-form-label" htmlFor="password">Password:</label>
                <div class="col-sm-10">
                    <input class="form-control" type="password" name="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <button class="btn btn-primary" type="submit">Log in</button>
            {message}
        </form>
    )
}

export default Login;