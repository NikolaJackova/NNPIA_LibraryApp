import {useContext, useState} from "react";
import AuthService from "../../services/AuthService";
import {useNavigate} from "react-router";
import {userContext} from "../../contexts/UserContext";
import { Navigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const [value, setValue] = useContext(userContext);

    const navigate = useNavigate()

    const loginHandler = async event => {
        event.preventDefault();
        AuthService.login(username, password).then((response) => {
                setValue(response);
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

    if (value){
        return <Navigate replace to={`/profile`} />
    }

    return (
        <div class="row mt-5 justify-content-center">
            <form class="col-lg-6" onSubmit={loginHandler}>
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
                <div class="row justify-content-end">
                    <div class="col-sm-3 text-end">
                        <button class="btn btn-primary w-100" type="submit">Log in</button>
                    </div>
                </div>
                {message && (
                    <div className="mt-3 alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
            </form>
        </div>
    )
}

export default Login;