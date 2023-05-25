import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

function Breadcrumbs() {
    return (
        <div className="breadcrumbs">
            <span><Link className="unstyled-link" to="/">Home</Link></span>
            <span><Link className="unstyled-link" to="/photo">Photos</Link></span>
        </div>
    )
}

export default Breadcrumbs;