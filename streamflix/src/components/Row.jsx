import Card from "./Card";
import { movies } from "../data";

export default function Row({ id, icon, title, items, emptyText, onOpen }) {
  return (
    <section id={id} className="content-row">
      <h2><i className={`fas ${icon}`}></i> {title}</h2>
      <div className="cards-row">
        {items.length ? (
          items.map((x) => (
            <Card key={x.title} item={x} index={movies.indexOf(x)} onOpen={onOpen} />
          ))
        ) : (
          <p className="empty-msg">{emptyText}</p>
        )}
      </div>
    </section>
  );
}