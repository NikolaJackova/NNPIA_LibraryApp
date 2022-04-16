import {useCallback, useMemo, useRef, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";
import Table from "../basic/Table";

function Books({libraryId}){

    const [books, setBooks] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [publishedYear, setPublishedYear] = useState(0)
    const [isbn, setIsbn] = useState("")
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
            },
            {
                Header: "Published Year",
                accessor: "publishedYear",
                show: true
            },
            {
                Header: "ISBN",
                accessor: "isbn",
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
            isbn: isbn
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
        <div>
            <form onSubmit={addBookHandler}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="description">Description:</label>
                <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label htmlFor="description">Published Year:</label>
                <input type="number" name="publishedYear" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)}/>
                <label htmlFor="isbn">Isbn:</label>
                <input type="text" name="isbn" value={isbn} onChange={(e) => setIsbn(e.target.value)}/>
                <input value="Add" type="submit"/>
            </form>
            <Table columns={columns} data={books} fetchDataHandler={fetchData}
                   deleteHandler={deleteBookHandler} pageCount={pageCount}/>
        </div>
    )
}

export default Books;