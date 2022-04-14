import DataGridCust from "../basic/DataGridCust";
import {useEffect, useState} from "react";
import axios from "axios";
import authHeader from "../../services/AuthHeader";

function Libraries(){
    const [libraries, setLibraries] = useState();
    const [message, setMessage] = useState("");

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
        <DataGridCust/>
        </div>
    )
}

export default Libraries;