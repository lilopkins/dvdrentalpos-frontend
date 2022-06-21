import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [actor, setActor] = useState(null);
    const [films, setFilms] = useState(null);

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
                <h1 className="name">{actor.firstName} {actor.lastName} Films</h1>
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
