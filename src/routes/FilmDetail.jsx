import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    const [error, setError] = useState(null);
    const [film, setFilm] = useState(null);
    const [cast, setCast] = useState(null);

    useEffect(() => {
        fetch(`${config.API_BASE}/films/${id}`)
            .then(res => res.json())
            .then(setFilm)
            .catch(setError);
        fetch(`${config.API_BASE}/films/${id}/actors`)
            .then(res => res.json())
            .then(setCast)
            .catch(setError);
    }, [id]);

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
                <h1 className="title">{film.title}</h1>
                <span className="subtext">Released {film.release_year} in {film.original_language ? film.original_language.name : film.language.name} &bull; {film.length} minutes</span>
                <p>{film.description}</p>
                <hr />
                <h2>Cast</h2>
                <ul>
                    {cast === null ? <LoadingSpinner /> : cast.sort((a, b) => a.id - b.id).map(actor => (
                        <li key={actor.id}>
                            <Link to={`/actor/${actor.id}`}>{actor.firstName} {actor.lastName}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
}
