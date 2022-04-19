import {useEffect, useState} from "react";
import * as AxiosAdapter from "../../adapters/AxiosAdapter";

function BookGenres({bookGenres, setBookGenres}) {
    const [allGenres, setGenres] = useState([]);

    const [message, setMessage] = useState("");
    useEffect(() => {
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
    }, [])

    const handleOnChange = (genre) => {
        if (contains(genre.id)) {
            setBookGenres(bookGenres.filter(item => item.id !== genre.id));
        } else {
            const newBookGenres = [...bookGenres];
            newBookGenres.push(genre);
            setBookGenres(newBookGenres);
        }
    };

    const contains = (genreId) => {
        let contains = false;
        bookGenres.forEach((item) => {
            if (genreId === item.id) {
                contains = true;
            }
        });
        return contains;
    }

    return (
        <ul className="list-group list-group-flush list-group-horizontal-sm flex-wrap">
            {allGenres.map((genre, index) => {
                return (
                    <li className="border-0 list-group-item" key={genre.id}>
                        <div className="form-check">
                            <input className="form-check-input"
                                   type="checkbox"
                                   id={genre.id}
                                   name={genre.id}
                                   value={genre.name}
                                   checked={contains(genre.id)}
                                   onChange={() => handleOnChange(genre)}
                            />
                            <label className="form-check-label" htmlFor={genre.id}>{genre.name}</label>
                        </div>
                    </li>
                );
            })}
            <br/>
        </ul>
    )
}

export default BookGenres;