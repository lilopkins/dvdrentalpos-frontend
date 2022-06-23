import { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import Pageable from "../components/Pageable";
import config from "../config";
import "./Browse.css";

export default function Browse() {
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("__default__");
    const [languages, setLanguages] = useState([]);
    // eslint-disable-next-line
    const [auth, setAuth, splitAuth] = useOutletContext();
    const titleRef = useRef();
    const minutesRef = useRef();
    const descriptionRef = useRef();
    const releaseYearRef = useRef();
    const ratingRef = useRef();
    const languageRef = useRef();

    useEffect(() => {
        fetch(`${config.API_BASE}/categories/all`)
            .then(res => res.json())
            .then(setCategories);
    }, []);

    useEffect(() => {
        fetch(`${config.API_BASE}/languages/all`)
            .then(res => res.json())
            .then(setLanguages);
    }, []);

    const addFilm = e => {
        e.preventDefault();
        let addDto = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            length: minutesRef.current.value,
            releaseYear: releaseYearRef.current.value,
            language: {
                id: languageRef.current.value,
                name: null,
            },
            originalLanguage: null,
            rentalDuration: null,
            rentalRate: null,
            replacementCost: null,
            rating: ratingRef.current.value,
            specialFeatures: "",
        };

        fetch(`${config.API_BASE}/films`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': splitAuth[2],
                },
                body: JSON.stringify(addDto),
            })
            .then(res => {
                if (res.ok) {
                    titleRef.current.value = "";
                    minutesRef.current.value = 0;
                    releaseYearRef.current.value = 2000;
                    descriptionRef.current.value = "";
                }
            })
    };

    return (
        <div className="browse">
            <h1>Browse Films</h1>

            {splitAuth && splitAuth[1] === "staff" ? 
            <>
                <h2>New Film</h2>
                <form onSubmit={addFilm}>
                    <label>
                        Title:&nbsp;
                        <input type="text" ref={titleRef} />
                    </label>
                    <label>
                        Length:&nbsp;
                        <input type="number" ref={minutesRef} />
                    </label>
                    <label>
                        Release Year:&nbsp;
                        <input type="year" defaultValue={2000} ref={releaseYearRef} />
                    </label>
                    <label>
                        Description:&nbsp;
                        <textarea ref={descriptionRef} />
                    </label>
                    <label>
                        Rating:&nbsp;
                        <select ref={ratingRef}>
                            <option>G</option>
                            <option>PG</option>
                            <option>PG-13</option>
                            <option>R</option>
                            <option>NC-17</option>
                        </select>
                    </label>
                    <label>
                        Language:&nbsp;
                        <select ref={languageRef}>
                            {languages.map(lang => (
                                <option key={lang.id} value={lang.id}>{lang.name}</option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Add" />
                </form>
                <hr />
            </> : undefined}

            <label>
                Category Filter:&nbsp;
                <select onChange={e => setFilter(e.target.value)}>
                    <option value="__default__">No category filter</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </label>
            <Pageable
                uri={filter === "__default__" ? "/films" : "/films/category/" + filter}
                sortable-by={{'title': 'Film Title'}}
                generator={item => (
                    <Link to={'/film/' + item.id}>
                        <div className="film-card">
                            <div>
                                <span className="title">{item.title}</span>
                                <span className={'rating rating-' + item.rating}>{item.rating}</span>
                            </div>
                            <span className="lang">{item.language.name}</span>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                )} />
        </div>
    );
}
