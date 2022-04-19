import {useCallback, useMemo, useRef, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import Table from "../basic/Table";

function Genres() {
    const [genres, setGenres] = useState([]);

    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [message, setMessage] = useState("");

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
                show: true
            },
            {
                Header: "Description",
                accessor: "description",
                show: true
            },
        ],
        []
    );

    const fetchGenres = (() => {
        AxiosAdapter.getReq(`/genres`)
            .then(response => {
                setGenres(response.data);
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

    const fetchData = useCallback(() => {
        const fetchId = ++fetchIdRef.current;
        if (fetchId === fetchIdRef.current) {
            fetchGenres();
        }
    }, []);

    const addGenreHandler = (event) => {
        event.preventDefault();

        const newGenre = {
            name: name,
            description: description
        }
        setMessage("");

        AxiosAdapter.postReq("/genres", newGenre)
            .then(response => {
                const newGenres = [...genres];
                newGenres.push(response.data);
                setGenres(newGenres);
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

    const deleteGenreHandler = (id) => {
        AxiosAdapter.deleteReq(`/genres/${id}`).then(response => {
            setGenres(genres.filter(item => item.id !== id));
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
        <div className="row justify-content-center">
            <form onSubmit={addGenreHandler}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="name">Name:</label>
                    <div className="col-sm-3">
                        <input className="form-control" type="text" name="name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                        <label className="col-sm-2 col-form-label" htmlFor="description">Description:</label>
                        <div className="col-sm-5">
                        <textarea className="form-control" name="description" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                </div>
                <div className="row mb-3 justify-content-end">
                    <div className="col-sm-3">
                        <button className="btn btn-primary w-100" type="submit">Add</button>
                    </div>
                </div>
            </form>
            <Table columns={columns} data={genres} fetchDataHandler={fetchData}
                   deleteHandler={deleteGenreHandler}/>
            {message}
        </div>
    )

}

export default Genres;