import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./App.css";
import config from "./config";

export default function App() {
  const activeLambda = ({ isActive }) => isActive ? 'active' : undefined;
  const [auth, _setAuth] = useState(null);

  useEffect(() => {
    _setAuth(localStorage.getItem('auth'));
  }, []);

  const setAuth = v => {
    if (v === null)
      localStorage.removeItem('auth');
    else
      localStorage.setItem('auth', v);
    _setAuth(v);
  };

  const splitAuth = auth !== null ? auth.split(":") : null;
  return (
    <>
      <header>
        <div className="container">
          <Link to="/" className="brand-title">FilmBuster Movie Rentals</Link>
          <nav>
            <NavLink to="/" className={activeLambda}>Home</NavLink>
            <NavLink to="/browse" className={activeLambda}>Films</NavLink>
            <NavLink to="/actors" className={activeLambda}>Actors</NavLink>
            {auth === null ?
              <Link to="/signin">Sign In</Link> : 
              <>
                <NavLink to="/profile" className={activeLambda}>
                  Welcome, {splitAuth[0]}{splitAuth[1] === "staff" ? " (staff)" : undefined}
                </NavLink>
                <button onClick={() => setAuth(null)}>Log out</button>
              </>}
          </nav>
        </div>
      </header>
      <div className="container">
        <Outlet context={[auth, setAuth, splitAuth]} />
      </div>
      <footer>
        <div className="container">
          Copyright &copy; Lily Hopkins 2022
          {config.DEVELOPMENT ? <p><strong>This is a development build!</strong></p> : null}
        </div>
      </footer>
    </>
  );
}
