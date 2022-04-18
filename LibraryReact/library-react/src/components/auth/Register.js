import {useContext, useState} from "react";
import AuthService from "../../services/AuthService";
import {Navigate} from "react-router-dom";
import {userContext} from "../../contexts/UserContext";

function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [value] = useContext(userContext);

    const registerHandler = event => {
        event.preventDefault();

        setMessage("");
        setSuccessful(false);
        AuthService.register(username, email, password)
            .then(response => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setSuccessful(false);
            });
    }

    if (value){
        return <Navigate replace to={`/profile`} />
    }

    return (
        <div class="row justify-content-center">
            <form class="col-lg-6" onSubmit={registerHandler}>
                <div className="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="username">Username:</label>
                    <div className="col-sm-10">
                        <input class="form-control" type="text" name="username" value={username}
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input class="form-control" type="email" name="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="password">Password:</label>
                    <div className="col-sm-10">
                        <input class="form-control" type="password" name="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-sm-3 text-end">
                        <button class="btn btn-primary w-100" type="submit">Register</button>
                    </div>
                </div>
            </form>
            {message && (
                <div className="mt-3 alert alert-danger" role="alert">
                    {message}
                </div>
            )}
            <p>{successful.valueOf()}</p>
        </div>
    )
}

export default Register;