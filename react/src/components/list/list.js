import React, { useEffect, useState } from "react";
import "./list.css";

function List() {
  const [mangaData, setMangaData] = useState([
    {
      id: 0,
      nome: "Boku no Hero",
      cap: 9,
    },
    {
      id: 1,
      nome: "Tensei shittara",
      cap: 1,
    },
    {
      id: 2,
      nome: "Solo Leveling",
      cap: 3,
    },
  ]);

  function handleAdd(id) {
    setMangaData(
      mangaData.map((manga) => {
        manga.id === id ? (manga.cap += 1) : (manga = manga);
        return manga;
      })
    );
  }
  function handleSub(id) {
    setMangaData(
      mangaData.map((manga) => {
        manga.id === id
          ? manga.cap > 0
            ? (manga.cap -= 1)
            : (manga.cap = 0)
          : (manga = manga);
        return manga;
      })
    );
  }
  return (
    <div className="list-body">
      {mangaData.map((manga) => (
        <div class="item">
          <p class="name">
            {manga.id} - {manga.nome}
          </p>
          <div class="cap">
            <small class="ncap">Cap. {manga.cap}</small>
            <button onClick={() => handleAdd(manga.id)} class="op add">
              +
            </button>
            <button onClick={() => handleSub(manga.id)} class="op sub">
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
