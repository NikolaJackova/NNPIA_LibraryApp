import {useEffect, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import {useParams} from "react-router";

function Book() {
    const params = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publishedYear, setPublishedYear] = useState();
    const [isbn, setIsbn] = useState("");
    const [numberOfPages, setNumberOfPages] = useState();
    const [score, setScore] = useState();
    const [evaluation, setEvaluation] = useState("");
    const [bookState, setBookState] = useState("READ");

    const [message, setMessage] = useState("");

    useEffect(
        () => {
            AxiosAdapter.getReq(`/libraries/${params.libraryId}/books/${params.bookId}`)
                .then(response => {
                    setName(response.data.name);
                    setDescription(response.data.description);
                    setNumberOfPages(response.data.numberOfPages);
                    setScore(response.data.score);
                    setEvaluation(response.data.evaluation);
                    setIsbn(response.data.isbn);
                    setPublishedYear(response.data.publishedYear);
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

    const saveBookHandler = event => {
        event.preventDefault();
    }

    return (
        <form className="col-md-12" onSubmit={saveBookHandler}>
            <div className="row mb-3">
                <label className="col-md-2 col-form-label" htmlFor="name">Name:</label>
                <div className="col-md-5">
                    <input className="form-control" type="text" name="name" value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <label className="col-md-2 col-form-label" htmlFor="state">State:</label>
                <div className="col-md-3">
                    <select className="form-select" value={bookState}
                            onChange={(e) => setBookState(e.target.value)} aria-label="Select library type">
                        <option value="READ" defaultValue>Read</option>
                        <option value="PROCEEDING">Proceeding</option>
                        <option value="PLANNED">Planned</option>
                        <option value="DEFERRED">Deferred</option>
                    </select>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-2 col-form-label" htmlFor="description">Description:</label>
                <div className="col-md-6">
                        <textarea className="form-control" name="description" value={description}
                                  onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <label className="col-md-2 col-form-label" htmlFor="year">Published Year:</label>
                <div className="col-md-2">
                    <input className="form-control" type="number" name="year" value={publishedYear}
                           onChange={(e) => setPublishedYear(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-2 col-form-label" htmlFor="score">Score:</label>
                <div className="col-md-2">
                    <input className="form-control" type="number" name="score" value={score}
                           onChange={(e) => setScore(e.target.value)}/>
                </div>
                <label className="col-md-1 col-form-label" htmlFor="isbn">Isbn:</label>
                <div className="col-md-3">
                    <input className="form-control" type="text" name="isbn" value={isbn}
                           onChange={(e) => setIsbn(e.target.value)}/>
                </div>
                <label className="col-md-2 col-form-label" htmlFor="year">Number of Pages:</label>
                <div className="col-md-2">
                    <input className="form-control" type="number" name="year" value={numberOfPages}
                           onChange={(e) => setNumberOfPages(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-md-2 col-form-label" htmlFor="evaluation">Evaluation:</label>
                <div className="col-md-6">
                        <textarea className="form-control" name="evaluation" value={evaluation}
                                  onChange={(e) => setEvaluation(e.target.value)}/>
                </div>
            </div>
            <div className="row mb-3 justify-content-end">
                <div className="col-md-3">
                    <button className="btn btn-primary w-100" type="submit">Save</button>
                </div>
            </div>
        </form>
    )
}

export default Book;