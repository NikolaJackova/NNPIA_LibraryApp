import {useMemo, useState, useCallback, useRef} from "react";
import Table from "../basic/Table";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import {Link} from "react-router-dom";

function Libraries() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [libraryType, setLibraryType] = useState("PRIVATE");
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
                Cell: props => <Link to={"/libraries/" + props.row.values.id}>{props.value}</Link>,
                show: true
            },
            {
                Header: "Description",
                accessor: "description",
                show: true
            },
            {
                Header: "Type",
                accessor: "libraryType",
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
            description: description,
            libraryType: libraryType
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
                setLibraryType(undefined);
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
        <div class="row justify-content-center">
            <form class="col-xl-8" onSubmit={addLibraryHandler}>
                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="name">Name:</label>
                    <div class="col-sm-5">
                        <input class="form-control" type="text" name="name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="name">Library Type:</label>
                    <div class="col-sm-3">
                        <select className="form-select" value={libraryType}
                                onChange={(e) => setLibraryType(e.target.value)} aria-label="Select library type">
                            <option value="PRIVATE" defaultValue>Private</option>
                            <option value="PUBLIC">Public</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="description">Description:</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" name="description" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3 justify-content-end">
                    <div className="col-sm-3">
                        <button className="btn btn-primary w-100" type="submit">Add</button>
                    </div>
                </div>
            </form>
            <h2>Libraries</h2>
            <Table columns={columns} data={libraries} fetchDataHandler={fetchData}
                   deleteHandler={deleteLibraryHandler} pageCount={pageCount}/>
            {message}
        </div>
    )
}

export default Libraries;