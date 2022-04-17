import {useEffect, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import {useParams} from "react-router";
import Books from "../book/Books";

function Library() {
    const params = useParams();

    const [books, setBooks] = useState([]);
    const [id, setId] = useState(params.libraryId);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [libraryType, setLibraryType] = useState("");
    const [message, setMessage] = useState("");

    useEffect(
        () => {
            AxiosAdapter.getReq("/libraries/" + params.libraryId)
                .then(response => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setLibraryType(response.data.libraryType);
                    setBooks(response.data.libraryBooks);
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

    const saveLibraryHandler = event => {
        event.preventDefault();
        const modifiedLibrary = {
            name: name,
            description: description,
            libraryType: libraryType
        }

        AxiosAdapter.putReq("/libraries/" + id, modifiedLibrary)
            .then(response => {
                setName(response.data.name);
                setDescription(response.data.description);
                setLibraryType(response.data.libraryType);
            }, error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage)
            });
    }

    return (
        <div>
            <form onSubmit={saveLibraryHandler}>
                <input type="hidden" value={id}/>
                <div className="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="name">Name:</label>
                    <div className="col-sm-3">
                        <input className="form-control" type="text" name="name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="name">TYPE TODO:</label>
                    <div className="col-sm-3">
                        <input className="form-control" type="text" name="name" value={libraryType}
                               onChange={(e) => setLibraryType(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label class="col-sm-2 col-form-label" htmlFor="description">Description:</label>
                    <div className="col-sm-6">
                        <textarea className="form-control" name="description" value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-primary" type="submit">Save</button>
                    </div>
                </div>
            </form>
            {message}
            <h2>Knihy</h2>
            <Books libraryId={id}/>
        </div>
    );
}

export default Library;