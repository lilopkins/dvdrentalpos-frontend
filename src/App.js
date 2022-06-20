import { NavLink, Outlet } from "react-router-dom";
import "./App.css";
import config from "./config";

export default function App() {
  const activeLambda = ({ isActive }) => isActive ? 'active' : undefined;
  return (
    <>
      <header>
        <div className="container">
          <span className="brand-title">Movie Rentals</span>
          <nav>
            <NavLink to="/" className={activeLambda}>Home</NavLink>
            <NavLink to="/browse" className={activeLambda}>Browse Films</NavLink>
            {/* <Link to="/signin">Sign In</Link> */}
          </nav>
        </div>
      </header>
      <div className="container">
        <Outlet />
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
