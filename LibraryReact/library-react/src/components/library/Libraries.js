import DataGridCust from "../basic/DataGridCust";
import {useMemo, useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../services/AuthHeader";
import Table from "../basic/Table";

function Libraries() {
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

    return (
        <div>
            <Table columns={columns} data={libraries}/>
            {message}
        </div>
    )
}

export default Libraries;