import { useState } from "react";

function getYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function MovieModal({ movie, inList, onClose, onToggleList }) {
  const [videoId, setVideoId] = useState(null);

  const startPlayer = () => {
    const id = getYoutubeId(movie.link);
    if (!id) {
      alert("Video not available for this title.");
      return;
    }
    setVideoId(id);
  };

  return (
    <div className="popup" style={{ display: "flex" }}>
      <div className="movie-box">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="player-area">
          {!videoId && <img src={movie.image} alt="Poster" />}
          {!videoId && (
            <div className="play-overlay" onClick={startPlayer}>
              <i className="fas fa-play-circle"></i>
              <span>Play Now</span>
            </div>
          )}
          {videoId && (
            <div className="yt-player" style={{ display: "block" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&controls=1&fs=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={movie.title}
              ></iframe>
            </div>
          )}
        </div>

        <div className="movie-info">
          <h2>{movie.title}</h2>
          <div className="meta">
            <span className="type-badge">{movie.type}</span>
            <span>{movie.genre}</span>
          </div>
          <p className="desc">{movie.desc || "Watch this title on StreamFlix."}</p>

          <div className="controls">
            <label>Language:</label>
            <select defaultValue="Telugu">
              <option>Telugu</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>English</option>
            </select>
          </div>

          <div className="action-buttons">
            <button className="btn-primary" onClick={startPlayer}>
              <i className="fas fa-play"></i> Play
            </button>
            <button className={`btn-outline ${inList ? "active" : ""}`} onClick={onToggleList}>
              <i className={`fas ${inList ? "fa-check" : "fa-plus"}`}></i>{" "}
              {inList ? "In My List" : "My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}