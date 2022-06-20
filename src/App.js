import { Link, Outlet } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/browse">Browse Films</Link>
        {/* <Link to="/signin">Sign In</Link> */}
      </nav>
      <div className="container">
        <Outlet />
      </div>
      <footer>
        Copyright &copy; Lily Hopkins 2022
      </footer>
    </>
  );
}
