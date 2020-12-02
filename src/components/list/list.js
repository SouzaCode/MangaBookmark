import React, { useEffect, useState } from "react";
import "./list.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function List({ mangaData, setMangaData, switchManga }) {
  const [changeAbaId, setChangeAbaId] = useState(null);
  function handleChangeAba(id) {
    changeAbaId === id ? setChangeAbaId(null) : setChangeAbaId(id);
  }
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
    const src = param.source.index;
    const dest = param.destination.index;
    let list = mangaData;
    list.splice(dest, 0, list.splice(src, 1)[0]);
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
                      <a
                        className="remove"
                        onClick={() => handleRemove(manga.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </a>
                      {manga.nome}
                    </p>

                    <div className="funcs">
                      {changeAbaId != manga.id ? (
                        <div className="cap">
                          <small className="ncap">Cap. {manga.cap}</small>
                          <a
                            onClick={() => handleAdd(manga.id)}
                            className="op add cantSelect"
                          >
                            +
                          </a>
                          <a
                            onClick={() => handleSub(manga.id)}
                            className="op sub cantSelect"
                          >
                            -
                          </a>
                        </div>
                      ) : (
                        <div className="changeAba">
                          <a
                            onClick={() => {
                              const switched = switchManga(
                                0,
                                manga.id,
                                setMangaData
                              );
                              if (switched) {
                                console.log("aaa");
                                handleRemove(manga.id);
                              }
                            }}
                            className="op cantSelect"
                          >
                            Reading
                          </a>
                          <a
                            onClick={() => {
                              const switched = switchManga(
                                1,
                                manga.id,
                                setMangaData
                              );
                              if (switched) {
                                console.log("aaa");
                                handleRemove(manga.id);
                              }
                            }}
                            className="op cantSelect"
                          >
                            Waiting
                          </a>
                          <a
                            onClick={() => {
                              const switched = switchManga(
                                2,
                                manga.id,
                                setMangaData
                              );
                              if (switched) {
                                console.log("aaa");
                                handleRemove(manga.id);
                              }
                            }}
                            className="op cantSelect"
                          >
                            Later
                          </a>
                          <a
                            onClick={() => {
                              const switched = switchManga(
                                3,
                                manga.id,
                                setMangaData
                              );
                              if (switched) {
                                console.log("aaa");
                                handleRemove(manga.id);
                              }
                            }}
                            className="op cantSelect"
                          >
                            Finished
                          </a>
                        </div>
                      )}

                      <a
                        onClick={() => handleChangeAba(manga.id)}
                        className="op abaSwitch cantSelect"
                      >
                        <FontAwesomeIcon
                          icon={
                            changeAbaId != manga.id
                              ? faChevronLeft
                              : faChevronRight
                          }
                        />
                      </a>
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
