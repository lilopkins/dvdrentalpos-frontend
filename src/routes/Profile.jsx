import { useState } from "react";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config";

export default function Profile() {
    // eslint-disable-next-line
    const [auth, setAuth, splitAuth] = useOutletContext();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (splitAuth === null) return;
        fetch(`${config.API_BASE}/auth/profile`, {
            headers: {
                'X-Token': splitAuth[2]
            }
        })
        .then(res => res.json())
        .then(setProfile);
    }, [splitAuth, setAuth]);

    if (profile === null)
        return <LoadingSpinner />;
    else
        return (
            <div className="profile">
                <h1>{splitAuth ? splitAuth[0] : undefined}'s Profile</h1>
                <hr />
                {splitAuth ? (splitAuth[1] === "staff" ?
                <div>
                    <div>
                        {profile.firstName}&nbsp;{profile.lastName}
                        <small>&nbsp;(Staff)</small>
                    </div>
                    <div>
                        Email: {profile.email}
                    </div>
                    <address>
                        {profile.address.address}<br />
                        {profile.address.address2}<br />
                        {profile.address.district}<br />
                        {profile.address.city.city}<br />
                        {profile.address.city.country.country}<br />
                        {profile.address.postalCode}
                    </address>
                    <span>Tel: {profile.address.phone}</span>
                </div> : 
                <div>
                    <div>
                        {profile.firstName}&nbsp;{profile.lastName}
                    </div>
                    <div>
                        Email: {profile.email}
                    </div>
                    {profile.address ? 
                    <address>
                        {profile.address.address}<br />
                        {profile.address.address2}<br />
                        {profile.address.district}<br />
                        {profile.address.city.city}<br />
                        {profile.address.city.country.country}<br />
                        {profile.address.postalCode}
                    </address> : undefined}
                </div>) : undefined}
            </div>
        );
}
