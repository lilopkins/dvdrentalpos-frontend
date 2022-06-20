import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../config";

/*
 * String description;
    int releaseYear;
    @OneToOne(optional = false)
    @JoinColumn(name = "language_id", nullable = false)
    Language language;
    @OneToOne
    @JoinColumn(name = "original_language_id")
    Language originalLanguage;
    int rentalDuration;
    float rentalRate;
    int length;
    float replacementCost;
    String rating;
    String specialFeatures;
 */

export default function FilmDetail() {
    let { id } = useParams();
    let [film, setFilm] = useState(null);

    useEffect(() => {
        fetch(`${config.API_BASE}/films/${id}`)
            .then(res => res.json())
            .then(setFilm);
    }, [id]);

    if (film == null)
        return <div>Loading...</div>;
    else
        return (
            <>
                <div>
                    <h1>{film.title}</h1>
                    <span>Released {film.release_year} in {film.original_language ? film.original_language.name : film.language.name}</span>
                    <span>{film.length} minutes long</span>
                    <p>{film.description}</p>
                </div>
            </>
        );
}
