import {useMemo, useEffect, useState, useCallback, useRef} from "react";
import Table from "../basic/Table";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";

function Libraries() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [libraries, setLibraries] = useState([]);
    const [message, setMessage] = useState("");

    const [pageCount, setPageCount] = useState(0);
    const fetchIdRef = useRef(0);

    const columns = useMemo(
            () => [
                {
                    Header: "Id",
                    accessor: "id",
                    show: false
                },
                {
                    Header: "Name",
                    accessor: "name",
                    Cell: props => <a href={"/libraries/" + props.row.values.id}>{props.value}</a>,
                    show: true
                },
                {
                    Header: "Description",
                    accessor: "description",
                    show: true
                }
            ],
            []
        );

    const fetchLibraries = (({pageIndex, pageSize}) => {
        AxiosAdapter.getReq(`/libraries?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            .then(response => {
                setLibraries(response.data.content);
                setPageCount(response.data.totalPages);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
            });
    });

    const fetchData = useCallback(({pageIndex, pageSize}) => {
        const fetchId = ++fetchIdRef.current;
        if (fetchId === fetchIdRef.current) {
            fetchLibraries({pageIndex, pageSize});
        }
    }, []);

    const addLibraryHandler = event => {
        event.preventDefault();

        const newLibrary = {
            name: name,
            description: description
        }

        AxiosAdapter.postReq("/libraries", newLibrary)
            .then(response => {
                const newLibraries = [...libraries];
                newLibraries.push(response.data);
                setLibraries(newLibraries);
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

    const deleteLibraryHandler = (id) => {
        AxiosAdapter.deleteReq("/libraries/" + id).then(response => {
            setLibraries(libraries.filter(item => item.id !== id));
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
        <div>
            <form onSubmit={addLibraryHandler}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="description">Description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <input value="Add" type="submit"/>
            </form>
            <Table columns={columns} data={libraries} fetchDataHandler={fetchData}
                   deleteHandler={deleteLibraryHandler} pageCount={pageCount}/>
            {message}
        </div>
    )
}

export default Libraries;