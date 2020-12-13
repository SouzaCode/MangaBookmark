import React, { useEffect, useState } from "react";
import "./list.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

function List({ mangaData, setMangaData, switchManga, gSync }) {
  const [changeAbaId, setChangeAbaId] = useState(null);
  const [editingMangaId, setEditingMangaId] = useState(null);
  function handleChangeAba(id) {
    changeAbaId === id ? setChangeAbaId(null) : setChangeAbaId(id);
  }
  async function switchMangaAba(aba, id) {
    const switched = await switchManga(aba, id, setMangaData);
    if (switched) {
      handleRemove(id);
      handleChangeAba(id);
    }
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
    gSync(mangaData);
  }
  function handleStartEdit(id) {
    editingMangaId !== id ? setEditingMangaId(id) : setEditingMangaId(null);
  }
  function handleEdit(newName) {
    let newData = mangaData;
    newData = newData.map((mg) => {
      if (mg.id === editingMangaId) {
        mg.nome = newName;
      }
      return mg;
    });
    setMangaData(newData);
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
                    className={changeAbaId !== manga.id ? "item" : "item-hide"}
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
                    <p
                      className={
                        editingMangaId === manga.id ? "editing-name" : "name"
                      }
                      {...provided.dragHandleProps}
                    >
                      <a
                        className="remove"
                        onClick={() => handleRemove(manga.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </a>
                      {editingMangaId === manga.id &&
                      changeAbaId !== manga.id ? (
                        <div className="edit">
                          <input
                            {...provided.dragHandleProps}
                            type="text"
                            onChange={(e) => handleEdit(e.target.value)}
                            name="manga"
                            value={manga.nome}
                            className="editBox"
                          ></input>
                          <a
                            className="op"
                            onClick={() => handleStartEdit(manga.id)}
                          >
                            OK
                          </a>
                        </div>
                      ) : (
                        <>
                          {manga.nome}{" "}
                          <a
                            className={
                              changeAbaId !== manga.id
                                ? "show-hover edit"
                                : "edit"
                            }
                            onClick={() => handleStartEdit(manga.id)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </a>
                        </>
                      )}
                    </p>

                    <div className="funcs">
                      {changeAbaId != manga.id ? (
                        <div className="cap">
                          {editingMangaId !== manga.id && (
                            <small className="ncap">Cap. {manga.cap}</small>
                          )}

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
                              switchMangaAba(0, manga.id);
                            }}
                            className="op cantSelect"
                          >
                            Reading
                          </a>
                          <a
                            onClick={() => {
                              switchMangaAba(1, manga.id);
                            }}
                            className="op cantSelect"
                          >
                            Waiting
                          </a>
                          <a
                            onClick={() => {
                              switchMangaAba(2, manga.id);
                            }}
                            className="op cantSelect"
                          >
                            Later
                          </a>
                          <a
                            onClick={() => {
                              switchMangaAba(3, manga.id);
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
