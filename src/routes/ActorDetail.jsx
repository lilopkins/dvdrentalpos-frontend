import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";
import './FilmDetail.css';

export default function FilmDetail() {
    let { id } = useParams();
    let [actor, setActor] = useState(null);
    let [films, setFilms] = useState(null);

    useEffect(() => {
        fetch(`${config.API_BASE}/actors/${id}`)
            .then(res => res.json())
            .then(setActor);
        fetch(`${config.API_BASE}/actors/${id}/films`)
            .then(res => res.json())
            .then(setFilms);
    }, [id]);

    if (actor == null)
        return <LoadingSpinner />;
    else
        return (
            <div className="actor-detail">
                <h1 className="name">{actor.firstName} {actor.lastName}</h1>
                <h2>Films</h2>
                <ul>
                    {films === null ? <LoadingSpinner /> : films.sort((a, b) => a.id - b.id).map(film => (
                        <li key={film.id}>
                            <Link to={`/films/${film.id}`}>{film.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
}
