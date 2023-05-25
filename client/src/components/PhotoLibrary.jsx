import { useNavigate } from 'react-router-dom'
import Photo from "./Photo";

import './PhotoLibrary.css';

function PhotoLibrary({ products }) {
    const navigate = useNavigate();
    function handleOnClick(id, description) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm(`Would you like to visit ${description}?`)) {
            navigate(`/photo/${id.toString()}`)
        }
    }
    return <div className="photo-library">
        {products?.map(photo => <Photo key={photo.id} id={photo.id} src={photo.src} description={photo.description} onClick={handleOnClick} />)}
    </div>
}

export default PhotoLibrary;