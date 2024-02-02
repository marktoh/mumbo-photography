import "./Photo.css";

function Photo({ id, src, description, onClick = () => {} }) {
  return (
    <div className="photo" onClick={() => onClick(id, description)}>
      <img src={src} alt={src} width={4608} height={3456} />
      <span className="description">{description}</span>
    </div>
  );
}

export default Photo;
