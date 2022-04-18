import {useCallback, useMemo, useRef, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import Table from "../basic/Table";
import {Link} from "react-router-dom";

function Books({libraryId}) {

    const [books, setBooks] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [publishedYear, setPublishedYear] = useState();
    const [isbn, setIsbn] = useState("");
    const [numberOfPages, setNumberOfPages] = useState();
    const [score, setScore] = useState();
    const [evaluation, setEvaluation] = useState("");
    const [bookState, setBookState] = useState("READ");

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
                Cell: props => <Link to={`/libraries/${libraryId}/books/${props.row.values.id}`}>{props.value}</Link>,
                show: true
            },
            {
                Header: "Description",
                accessor: "description",
                show: true
            },
            {
                Header: "State",
                accessor: "bookState",
                show: true
            },
            {
                Header: "Genres",
                accessor: "genres",
                show: true
            }
        ],
        []
    );

    const fetchBooks = (({pageIndex, pageSize}) => {
        AxiosAdapter.getReq(`/libraries/${libraryId}/books?pageIndex=${pageIndex}&pageSize=${pageSize}`)
            .then(response => {
                setBooks(response.data.content);
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
            fetchBooks({pageIndex, pageSize});
        }
    }, []);

    const addBookHandler = event => {
        event.preventDefault();

        const newBook = {
            name: name,
            description: description,
            publishedYear: publishedYear,
            isbn: isbn,
            evaluation: evaluation,
            score: score,
            bookState: bookState,
            numberOfPages: numberOfPages
        }

        AxiosAdapter.postReq(`/libraries/${libraryId}/books`, newBook)
            .then(response => {
                const newBooks = [...books];
                newBooks.push(response.data);
                setBooks(newBooks);
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
                setNumberOfPages(undefined);
                setScore(undefined);
                setEvaluation("");
                setIsbn("");
                setPublishedYear(undefined);
            }
        );
    }

    const deleteBookHandler = (id) => {
        AxiosAdapter.deleteReq(`/libraries/${libraryId}/books/${id}`).then(response => {
            setBooks(books.filter(item => item.id !== id));
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
            <form class="col-md-12" onSubmit={addBookHandler}>
                <div className="row mb-3">
                    <label className="col-md-2 col-form-label" htmlFor="name">Name:</label>
                    <div className="col-md-5">
                        <input class="form-control" type="text" name="name" value={name}
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
                        <button className="btn btn-primary w-100" type="submit">Add</button>
                    </div>
                </div>
            </form>
            <Table columns={columns} data={books} fetchDataHandler={fetchData}
                   deleteHandler={deleteBookHandler} pageCount={pageCount}/>
        </div>
    )
}

export default Books;