import {useState} from "react";
import AuthService from "../../services/AuthService";

function Login(){
    const[username, setUsername] = useState();
    const[password, setPassword] = useState();

    const loginHandler = event => {
        event.preventDefault();
        AuthService.login(username, password);
    }

    return(
        <form onSubmit={loginHandler}>
            <label htmlFor="username">Username:</label>
            <input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label htmlFor="password">Password:</label>
            <input name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input value="Login" type="submit"/>
        </form>
    )
}

export default Login;