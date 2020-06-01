import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';

import './style.css';

const Notfound: FunctionalComponent = () => {
    return (
        <div class="notfound">
            <h1>Error 404</h1>
            <p>That page doesnt exist.</p>
            <Link href="/">
                <h4>Back to Home</h4>
            </Link>
        </div>
    );
};

export default Notfound;
