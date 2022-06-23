import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [film, setFilm] = useState(null);
    const [cast, setCast] = useState(null);
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [auth, setAuth, splitAuth] = useOutletContext();
    const [editActors, setEditActors] = useState([]);
    const [editActorsSearch, setEditActorsSearch] = useState([]);
    const addActorSelect = useRef();

    const titleRef = useRef();
    const minutesRef = useRef();
    const descriptionRef = useRef();

    const updateCast = useCallback(() => {
        fetch(`${config.API_BASE}/films/${id}/actors`)
            .then(res => res.json())
            .then(setCast)
            .catch(setError);
    }, [id]);

    useEffect(() => {
        fetch(`${config.API_BASE}/films/${id}`)
            .then(res => res.json())
            .then(setFilm)
            .catch(setError);
        updateCast();
    }, [id, updateCast]);

    useEffect(() => {
        fetch(`${config.API_BASE}/actors/search?q=${editActorsSearch}`)
            .then(res => res.json())
            .then(setEditActors);
    }, [editActorsSearch]);

    const updateFilm = () => {
        let title = titleRef.current.value;
        let minutes = minutesRef.current.value;
        let description = descriptionRef.current.value;

        let updateDto = {
            title: title,
            description: description,
            length: minutes,

            releaseYear: film.releaseYear,
            language: film.language,
            originalLanguage: film.originalLanguage,
            rentalDuration: film.rentalDuration,
            rentalRate: film.rentalRate,
            replacementCost: film.replacementCost,
            rating: film.rating,
            specialFeatures: film.specialFeatures,
        };

        fetch(`${config.API_BASE}/films/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': splitAuth[2],
                },
                body: JSON.stringify(updateDto),
            })
            .then(res => {
                if (res.ok)
                    return res.json();
                if (res.status === 400) {
                    setError("Please log in again!");
                    setAuth(null);
                }
            })
            .then(setFilm)
            .then(() => setEdit(false))
            .catch(setError);
    }

    const deleteFilm = () => {
        fetch(`${config.API_BASE}/films/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-Token': splitAuth[2]
                }
            })
            .then(res => {
                if (res.ok) {
                    navigate('/browse');
                } else {

                }
            })
            .catch(setError);
    };

    const addActorToFilm = () => {
        const newActorId = addActorSelect.current.value;
        if (newActorId !== null) {
            fetch(`${config.API_BASE}/films/${id}/actors/${newActorId}`, {
                    method: 'PUT',
                    headers: {
                        'X-Token': splitAuth[2]
                    }
                })
                .then(updateCast)
                .catch(setError);
        }
    };

    const removeActorFromFilm = aid => {
        fetch(`${config.API_BASE}/films/${id}/actors/${aid}`, {
                method: 'DELETE',
                headers: {
                    'X-Token': splitAuth[2]
                }
            })
            .then(updateCast)
            .catch(setError);
    };

    if (error !== null)
        return <div className="error">
            <h1>Error</h1>
            <p>{error.message}</p>
        </div>;
    else if (film == null)
        return <LoadingSpinner />;
    else
        return (
            <div className="film-detail">
                {auth && splitAuth[1] === "staff" ? 
                <div className="actions">
                    {edit ? <button onClick={updateFilm}>Save</button> : null}
                    <button onClick={() => setEdit(!edit)}>{edit ? "Cancel Editing" : "Edit"}</button>
                    <button onClick={deleteFilm}>Delete</button>
                </div>
                : undefined}
                <h1 className="title">{edit ? <input type="text" defaultValue={film.title} ref={titleRef} /> : film.title}</h1>
                <span className="subtext">
                    Released {film.release_year}
                    in {film.original_language ? film.original_language.name : film.language.name}
                    &nbsp;&bull;&nbsp;
                    {edit ? <input type="number" defaultValue={film.length} ref={minutesRef} /> : film.length} minutes
                </span>
                {edit ? <textarea defaultValue={film.description} ref={descriptionRef}></textarea> : <p>{film.description}</p>}
                {auth ? <Link to="/watch">Rent this Film</Link> : undefined}
                <hr />
                <h2>Cast</h2>
                {auth && splitAuth[1] === "staff" ? 
                <>
                    <h3>Add an actor</h3>
                    <input type="text" placeholder="Search for an Actor" onChange={e => setEditActorsSearch(e.target.value)} />
                    <select ref={addActorSelect}>
                        {editActors.map(act => (
                            <option key={act.id} value={act.id}>{act.firstName} {act.lastName}</option>
                        ))}
                    </select>
                    <button onClick={addActorToFilm}>Add</button>
                    <hr />
                </>
                : undefined}
                <ul>
                    {cast === null ? <LoadingSpinner /> : cast.sort((a, b) => a.id - b.id).map(actor => (
                        <li key={actor.id}>
                            <Link to={`/actor/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                            {auth && splitAuth[1] === "staff" ?
                            <>
                                &nbsp;
                                <button onClick={() => removeActorFromFilm(actor.id)}>Remove</button>
                            </> : null}
                        </li>
                    ))}
                </ul>
            </div>
        );
}
