import {useState} from "react";
import AuthService from "../../services/AuthService";

function Register() {
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();
    const[email, setEmail] = useState();
    const[message, setMessage] = useState("");
    const[successful, setSuccessful] = useState(false);

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

    return(
        <div>
        <form onSubmit={registerHandler}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input value="Register" type="submit"/>
        </form>
            <p>{message}</p>
            <p>{successful.valueOf()}</p>
        </div>
    )
}

export default Register;