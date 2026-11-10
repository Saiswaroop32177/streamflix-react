import { useEffect, useState } from "react";
import { featured } from "../data";

export default function Hero({ onPlay }) {
  const [index, setIndex] = useState(0);

  // auto slide every 5.5s (timer resets whenever slide changes, like your original)
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % featured.length), 5500);
    return () => clearInterval(t);
  }, [index]);

  const item = featured[index];

  return (
    <section id="home" className="hero">
      <div className="hero-slides">
        {featured.map((f, i) => (
          <div
            key={i}
            className={`hero-slide ${i === index ? "active" : ""}`}
            style={{ backgroundImage: `url('${f.image}')` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <p className="tag">STREAMFLIX ORIGINAL</p>
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => onPlay(item.movieIndex)}>
            <i className="fas fa-play"></i> Play
          </button>
          <button
            className="btn-secondary"
            onClick={() =>
              document.getElementById("movies")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <i className="fas fa-info-circle"></i> More Info
          </button>
        </div>
      </div>

      <div className="hero-dots">
        {featured.map((_, i) => (
          <div
            key={i}
            className={`hero-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}