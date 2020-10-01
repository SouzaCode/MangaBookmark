import React, { useEffect, useState } from "react";
import "./list.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  function handleDragEnd(param) {
    console.log(param);
    const src = param.source.index;
    const dest = param.destination.index;
    let list = mangaData;
    list.splice(dest, 0, list.splice(src, 1)[0]);
    console.log(list);
    setMangaData(list);
    chrome.storage.sync.set({ mangaData: mangaData }, function () {});
  }
  return (
    <DragDropContext
      onDragEnd={(param) => {
        handleDragEnd(param);
      }}
    >
      <Droppable droppableId="droppable-1">
        {(provided, _) => (
          <div
            classNameName="list-body"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {mangaData.map((manga, i) => (
              <Draggable
                key={manga.id}
                draggableId={"draggable-" + manga.id}
                index={i}
              >
                {(provided, snapshot) => (
                  <div
                    className="item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging
                        ? "#323232"
                        : "#282c34",
                      boxShadow: snapshot.isDragging
                        ? "0 0 .4rem #356"
                        : "none",
                    }}
                  >
                    <p className="name" {...provided.dragHandleProps}>
                      <button
                        className="remove"
                        onClick={() => handleRemove(manga.id)}
                      >
                        x
                      </button>
                      {manga.nome}
                    </p>
                    <div className="cap">
                      <small className="ncap">Cap. {manga.cap}</small>
                      <button
                        onClick={() => handleAdd(manga.id)}
                        className="op add"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleSub(manga.id)}
                        className="op sub"
                      >
                        -
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
