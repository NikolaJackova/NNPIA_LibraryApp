import {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import authHeader from "../../services/AuthHeader";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";

function Profile() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        AxiosAdapter.getReq("/users/"+currentUser.username)
            .then(response => {
                setUser(response.data);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    }, [currentUser.username]);

    return (
        <div>
            {user.username}
            <br/>
            {user.email}
            <br/>
            {authHeader().Authorization}
            <br/>
            {message}
        </div>
    )
}

export default Profile;