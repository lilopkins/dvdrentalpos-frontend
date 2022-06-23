import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [actor, setActor] = useState(null);
    const [films, setFilms] = useState(null);
    const [edit, setEdit] = useState(false);
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    // eslint-disable-next-line
    const [auth, setAuth, splitAuth] = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.API_BASE}/actors/${id}`)
            .then(res => res.json())
            .then(setActor)
            .catch(setError);
        fetch(`${config.API_BASE}/actors/${id}/films`)
            .then(res => res.json())
            .then(setFilms)
            .catch(setError);
    }, [id]);

    const updateActor = () => {
        let updateDto = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
        };

        fetch(`${config.API_BASE}/actors/${id}`, {
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
            .then(setActor)
            .then(() => setEdit(false))
            .catch(setError);
    };

    const deleteActor = () => {
        fetch(`${config.API_BASE}/actors/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': splitAuth[2],
                }
            })
            .then(res => {
                if (res.ok) {
                    navigate("/actors");
                }
                if (res.status === 400) {
                    setError("Please log in again!");
                    setAuth(null);
                }
            })
            .catch(setError);
    };

    if (error !== null)
        return <div className="error">
            <h1>Error</h1>
            <p>{error.message}</p>
        </div>;
    else if (actor == null)
        return <LoadingSpinner />;
    else
        return (
            <div className="actor-detail">
                {splitAuth && splitAuth[1] === "staff" ? 
                <>
                    {edit ? <button onClick={updateActor}>Save</button> : undefined}
                    <button onClick={() => setEdit(!edit)}>{edit ? "Cancel editing" : "Edit"}</button>
                    <button onClick={deleteActor}
                            disabled={!films || films.length > 0}
                            title={!films || films.length > 0 ? "You cannot delete an actor who is in any films!" : null}>
                        
                        Delete
                    </button>
                </> : undefined}
                <h1 className="name">
                    {edit ? 
                    <>
                        <input type="text" defaultValue={actor.firstName} ref={firstNameRef} />
                        <input type="text" defaultValue={actor.lastName} ref={lastNameRef}/>
                    </> :
                    <>{actor.firstName} {actor.lastName}</>}
                </h1>
                <h2>Films</h2>
                <ul>
                    {films === null ? <LoadingSpinner /> : films.sort((a, b) => a.id - b.id).map(film => (
                        <li key={film.id}>
                            <Link to={`/film/${film.id}`}>{film.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
}
