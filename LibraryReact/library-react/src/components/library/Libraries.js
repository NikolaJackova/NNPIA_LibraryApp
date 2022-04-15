import {useMemo, useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../services/AuthHeader";
import Table from "../basic/Table";
import AuthService from "../../services/AuthService";

function Libraries() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [libraries, setLibraries] = useState([]);
    const [message, setMessage] = useState("");

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id"
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Description",
                accessor: "description"
            }
        ],
        []
    );

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_DEVELOPMENT}/libraries`, {
                headers: authHeader()
            })
            .then(response => {
                setLibraries(response.data);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    }, []);

    const addLibraryHandler = event => {
        event.preventDefault();

        const newLibrary = {
            name: name,
            description: description
        }

        axios
            .post(`${process.env.REACT_APP_DEVELOPMENT}/libraries`, newLibrary, {
                headers: authHeader()
            })
            .then(response => {
                const newLibrary = [...libraries];
                newLibrary.push(response.data);
                setLibraries(newLibrary);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            }).finally(() => {
                setName("");
                setDescription("");
            }
        );
    }

    return (
        <div>
            <form onSubmit={addLibraryHandler}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="username" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="description">Description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input value="Add" type="submit"/>
            </form>
            <Table columns={columns} data={libraries}/>
            {message}
        </div>
    )
}

export default Libraries;