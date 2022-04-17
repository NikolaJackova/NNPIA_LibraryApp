import {useEffect, useState} from "react";
import AuthService from "../../services/AuthService";
import authHeader from "../../services/AuthHeader";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";

function Profile() {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [user, setUser] = useState([]);
    const [message, setMessage] = useState("");

    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState(undefined);

    useEffect(() => {
        AxiosAdapter.getReq("/users/"+currentUser.username)
            .then(response => {
                setUser(response.data);
                setEmail(response.data.email);
                setBirthDate(response.data.birthDate);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    }, [currentUser]);

    const editUserHandler = event => {
        event.preventDefault();
        setMessage("");

        user.email = email;
        user.birthDate = birthDate;

        AxiosAdapter.putReq(`/users/${user.username}`, user)
            .then(response => {
                setUser(response.data);
                setEmail(response.data.email);
                setBirthDate(response.data.birthDate);
            }, error => {
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
        <div class="row mt-5 justify-content-center">
            <form class="col-lg-6" onSubmit={editUserHandler}>
                <div className="row mb-3 align-items-center">
                    <label className="col-sm-2 col-form-label" htmlFor="username">Username:</label>
                    <div className="col-sm-3">
                        <input className="form-control-plaintext" type="text" name="username" value={user.username} readonly/>
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="created">Created:</label>
                    <div className="col-sm-3">
                        <input className="form-control-plaintext" type="text" name="created" value={user.created} readOnly/>
                    </div>
                    <div className="col-sm-2">
                        {user.userRoles && (
                            user.userRoles.map(role => <span
                                className="badge bg-primary text-light">{role.roleType}</span>))}
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="email">Email:</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="email" name="email" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="birthDate">Birth Date:</label>
                    <div className="col-sm-10">
                        <input className="form-control" type="date" name="birthDate" value={birthDate}
                               onChange={(e) => setBirthDate(e.target.value)}/>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <div className="col-sm-3 text-end">
                        <button className="btn btn-primary w-100" type="submit">Save</button>
                    </div>
                </div>
                {message}
            </form>
        </div>
    )
}

export default Profile;