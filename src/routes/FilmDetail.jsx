import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    let [film, setFilm] = useState(null);
    let [cast, setCast] = useState(null);

    useEffect(() => {
        fetch(`${config.API_BASE}/films/${id}`)
            .then(res => res.json())
            .then(setFilm);
        fetch(`${config.API_BASE}/films/${id}/actors`)
            .then(res => res.json())
            .then(setCast);
    }, [id]);

    if (film == null)
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
