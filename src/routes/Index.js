import { Link } from "react-router-dom";

export default function Index() {
    return (
        <>
            <h1>Welcome to FilmBuster Movie Rentals!</h1>
            <p><em>The</em> place to rent movies from.</p>

            <h2>Get started</h2>
            <p>Get started by <Link to="/browse">browsing our catalogue of films</Link>.</p>
        </>
    );
}
