import { useEffect, useState } from "react";

const links = [
  ["Home", "#home"],
  ["Movies", "#movies"],
  ["Shows", "#shows"],
  ["Series", "#series"],
  ["My List", "#mylist"],
  ["Plans", "#plans"],
];

export default function Header({ search, setSearch, loggedIn, userName, onLogin, onLogout }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () =>
    document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="logo" onClick={goHome}>
        STREAM<span>FLIX</span>
      </div>

      <nav>
        {links.map(([label, href]) => (
          <a key={href} href={href} className="nav-link">{label}</a>
        ))}
      </nav>

      <div className="header-right">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Titles, genres..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="user-area">
          <span className="user-name">{loggedIn ? userName : ""}</span>
          {loggedIn ? (
            <button onClick={onLogout}>
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          ) : (
            <button onClick={onLogin}>
              <i className="fas fa-user"></i> Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}