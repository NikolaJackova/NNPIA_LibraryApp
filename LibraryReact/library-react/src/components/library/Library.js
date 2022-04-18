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
        <div class="row justify-content-center">
            <h2>{name}</h2>
            <form className="col-xl-8 mt-3" onSubmit={saveLibraryHandler}>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="name">Name:</label>
                    <div className="col-sm-5">
                        <input className="form-control" type="text" name="name" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <label className="col-sm-2 col-form-label" htmlFor="name">Library Type:</label>
                    <div className="col-sm-3">
                        <select className="form-select" value={libraryType}
                                onChange={(e) => setLibraryType(e.target.value)} aria-label="Select library type">
                            <option value="PRIVATE">Private</option>
                            <option value="PUBLIC">Public</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label" htmlFor="description">Description:</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" name="description" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3 justify-content-end">
                    <div className="col-sm-3">
                        <button className="btn btn-primary w-100" type="submit">Save</button>
                    </div>
                </div>
            </form>
            {message}
            <h3>Knihy</h3>
            <Books libraryId={id}/>
        </div>
    );
}

export default Library;