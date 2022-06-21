import { useEffect, useState } from 'react';
import './LoadingSpinner.css';

export default function LoadingSpinner() {
    const [extra, setExtra] = useState(null);

    useEffect(() => {
        setTimeout(() => setExtra("Still loading..."), 5000);
    }, []);

    return <div className="loading-spinner"><div class="lds-dual-ring"></div><div>{extra}</div></div>;
}
