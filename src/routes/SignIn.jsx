import { useState } from "react";
import { useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../config";
import './SignIn.css';

export default function SignIn() {
    const username = useRef();
    const password = useRef();
    const [error, setError] = useState(null);
    // eslint-disable-next-line
    const [auth, setAuth] = useOutletContext();
    const navigate = useNavigate();

    const signIn = e => {
        e.preventDefault();
        const usernameValue = username.current.value;
        const passwordValue = password.current.value;

        fetch(`${config.API_BASE}/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAuth(`${usernameValue}:${data.scope}:${data.token}`);
                    navigate("/", { replace: true });
                } else {
                    setError(data.message);
                }
            })
            .catch(setError);
    };

    return (
        <div className="signin">
            <h1>Sign in</h1>
            {error !== null ? <p>{error}</p> : undefined}
            <form onSubmit={signIn}>
                <div>
                    <label>
                        Username:&nbsp;
                        <input type="text" name="username" ref={username} />
                    </label>
                </div>
                <div>
                    <label>
                        Password:&nbsp;
                        <input type="password" name="password" ref={password} />
                    </label>
                </div>
                <input type="submit" value="Sign In" />
            </form>
        </div>
    );
}
