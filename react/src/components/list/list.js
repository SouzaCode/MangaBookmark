import React, { useEffect, useState } from "react";
import "./list.css";

function List({ mangaData, setMangaData }) {
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
  function handleRemove(id) {
    setMangaData(
      mangaData.filter((manga) => {
        return manga.id != id;
      })
    );
  }
  return (
    <div classNameName="list-body">
      {mangaData.map((manga) => (
        <div className="item">
          <p className="name">
            <button className="remove" onClick={() => handleRemove(manga.id)}>
              x
            </button>
            {manga.nome}
          </p>
          <div className="cap">
            <small className="ncap">Cap. {manga.cap}</small>
            <button onClick={() => handleAdd(manga.id)} className="op add">
              +
            </button>
            <button onClick={() => handleSub(manga.id)} className="op sub">
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default List;
