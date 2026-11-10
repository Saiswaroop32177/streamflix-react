export default function Card({ item, index, onOpen }) {
  return (
    <div className="card" onClick={() => onOpen(index)}>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x450/222/666?text=No+Image";
        }}
      />
      <div className="card-body">
        <h3>{item.title}</h3>
        <p>{item.genre}</p>
        <button
          className="card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(index);
          }}
        >
          <i className="fas fa-play"></i> Watch
        </button>
      </div>
    </div>
  );
}