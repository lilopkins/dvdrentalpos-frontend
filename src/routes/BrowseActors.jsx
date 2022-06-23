import { useRef } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Pageable from "../components/Pageable";
import config from "../config";
import "./BrowseActors.css";

export default function BrowseActors() {
    // eslint-disable-next-line
    const [auth, setAuth, splitAuth] = useOutletContext();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const navigate = useNavigate();

    const addActor = e => {
        e.preventDefault();
        let addObj = {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
        };
        fetch(`${config.API_BASE}/actors`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Token': splitAuth[2],
                },
                body: JSON.stringify(addObj),
            })
            .then(res => res.json())
            .then(res => navigate("/actor/" + res.id));
    };

    return (
        <div className="browse-actors">
            <h1>Browse Actors</h1>

            {splitAuth && splitAuth[1] === "staff" ? 
            <>
                <h2>New Actor</h2>
                <form onSubmit={addActor}>
                    <label>
                        First Name:&nbsp;
                        <input type="text" ref={firstNameRef} />
                    </label>
                    <label>
                        Last Name:&nbsp;
                        <input type="text" ref={lastNameRef} />
                    </label>
                    <input type="submit" value="Add" />
                </form>
                <hr />
            </> : undefined}

            <Pageable
                uri="/actors"
                sortable-by={{'firstName': 'First Name', 'lastName': 'Surname'}}
                generator={item => (
                    <Link to={'/actor/' + item.id}>
                        <div className="actor-card">
                            <span className="title">{item.firstName} {item.lastName}</span>
                        </div>
                    </Link>
                )} />
        </div>
    );
}
