import { useEffect, useState } from "react";
import { movies } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Row from "./components/Row";
import Plans from "./components/Plans";
import AuthModal from "./components/AuthModal";
import MovieModal from "./components/MovieModal";
import PaymentModal from "./components/PaymentModal";
import Footer from "./components/Footer";

export default function App() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [selected, setSelected] = useState(null);   // movie popup
  const [authMode, setAuthMode] = useState(null);   // null | "login" | "signup"
  const [plan, setPlan] = useState(null);           // payment popup

  const userName =
    localStorage.getItem("userName") || (user ? user.split("@")[0] : "");

  /* ---------- helpers ---------- */
  const refreshUser = () => setUser(localStorage.getItem("user"));

  const requireLogin = () => {
    if (!localStorage.getItem("user")) {
      setAuthMode("login");
      return false;
    }
    return true;
  };

  const openMovie = (index) => {
    if (!requireLogin()) return;
    const m = movies[index];
    if (m) setSelected(m);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    refreshUser();
    alert("You have been signed out.");
  };

  const toggleWatchlist = () => {
    if (!selected) return;
    const title = selected.title;
    let updated;
    if (watchlist.includes(title)) {
      updated = watchlist.filter((t) => t !== title);
      alert(title + " removed from My List.");
    } else {
      updated = [...watchlist, title];
      alert(title + " added to My List!");
    }
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  const buyPlan = (name, price) => {
    if (!requireLogin()) return;
    setPlan({ name, price });
  };

  /* ---------- Esc key closes every popup ---------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
        setPlan(null);
        setAuthMode(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ---------- lock page scroll while a popup is open ---------- */
  useEffect(() => {
    const open = selected || plan || authMode;
    document.body.style.overflow = open ? "hidden" : "";
  }, [selected, plan, authMode]);

  /* ---------- search ---------- */
  const q = search.toLowerCase().trim();
  const list = q
    ? movies.filter(
        (x) =>
          x.title.toLowerCase().includes(q) ||
          x.genre.toLowerCase().includes(q) ||
          x.type.toLowerCase().includes(q)
      )
    : movies;

  const watchItems = movies.filter((m) => watchlist.includes(m.title));

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
        loggedIn={!!user}
        userName={userName}
        onLogin={() => setAuthMode("login")}
        onLogout={logout}
      />

      <Hero onPlay={openMovie} />

      <Row id="trending" icon="fa-fire" title="Trending Now"
           items={list.slice(0, 8)} emptyText="No results." onOpen={openMovie} />
      <Row id="movies" icon="fa-film" title="Popular Movies"
           items={list.filter((x) => x.type === "Movie")} emptyText="No movies found." onOpen={openMovie} />
      <Row id="shows" icon="fa-tv" title="Popular Shows"
           items={list.filter((x) => x.type === "Show")} emptyText="No shows found." onOpen={openMovie} />
      <Row id="series" icon="fa-clapperboard" title="Top Series"
           items={list.filter((x) => x.type === "Series")} emptyText="No series found." onOpen={openMovie} />
      <Row id="mylist" icon="fa-heart" title="My List"
           items={watchItems}
           emptyText="Your list is empty. Add titles from the details page."
           onOpen={openMovie} />

      <Plans onBuy={buyPlan} />

      {authMode && (
        <AuthModal
          mode={authMode}
          setMode={setAuthMode}
          onClose={() => setAuthMode(null)}
          onDone={() => {
            refreshUser();
            setAuthMode(null);
          }}
        />
      )}

      {selected && (
        <MovieModal
          movie={selected}
          inList={watchlist.includes(selected.title)}
          onClose={() => setSelected(null)}
          onToggleList={toggleWatchlist}
        />
      )}

      {plan && <PaymentModal plan={plan} onClose={() => setPlan(null)} />}

      <Footer />
    </>
  );
}