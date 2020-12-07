import React, { useEffect, useState } from "react";

import "./App.css";
import List from "./components/list/list";
import Options from "./components/options/options";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faCog,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [mangaData, setMangaData] = useState([]);
  const [mangaWaitingData, setMangaWaitingData] = useState([]);
  const [mangaLaterData, setMangaLaterData] = useState([]);
  const [mangaFinishData, setMangaFinishData] = useState([]);
  const [inOptions, setInOptions] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCap, setNewCap] = useState();
  const [selectedAba, setSelectedAba] = useState(0);
  const abasNames = [
    "mangaData",
    "mangaWaitingData",
    "mangaLaterData",
    "mangaFinishData",
  ];
  const googleFunctions = {
    mangaData(obj) {
      chrome.storage.sync.set({ mangaData: obj }, function () {});
    },
    mangaWaitingData(obj) {
      chrome.storage.sync.set({ mangaWaitingData: obj }, function () {});
    },
    mangaLaterData(obj) {
      chrome.storage.sync.set({ mangaLaterData: obj }, function () {});
    },
    mangaFinishData(obj) {
      chrome.storage.sync.set(
        { mangaFinishData: mangaFinishData },
        function () {}
      );
    },
  };
  const allMangasData = {
    mangaData: mangaData,
    mangaWaitingData: mangaWaitingData,
    mangaLaterData: mangaLaterData,
    mangaFinishData: mangaFinishData,
  };
  const allMangasSet = {
    mangaData(obj) {
      setMangaData(obj);
    },
    mangaWaitingData(obj) {
      setMangaWaitingData(obj);
    },
    mangaLaterData(obj) {
      setMangaLaterData(obj);
    },
    mangaFinishData(obj) {
      setMangaFinishData(obj);
    },
  };
  function getInitialData(dataName, setFunc) {
    chrome.storage.sync.get([dataName], function (r) {
      let data;
      if (r[dataName] === undefined) {
        const gSync = googleFunctions[dataName];
        //chrome.storage.sync.set(mData, function () {});
        gSync([]);
        data = [];
      } else {
        data = r[dataName];
      }
      setFunc(data);
    });
  }
  useEffect(() => {
    getInitialData("mangaData", setMangaData);
    getInitialData("mangaWaitingData", setMangaWaitingData);
    getInitialData("mangaLaterData", setMangaLaterData);
    getInitialData("mangaFinishData", setMangaFinishData);
  }, []);
  useEffect(() => {
    chrome.storage.sync.set({ mangaData: mangaData }, function () {});
  }, [mangaData]);
  useEffect(() => {
    chrome.storage.sync.set(
      { mangaWaitingData: mangaWaitingData },
      function () {}
    );
  }, [mangaWaitingData]);
  useEffect(() => {
    chrome.storage.sync.set({ mangaLaterData: mangaLaterData }, function () {});
  }, [mangaLaterData]);
  useEffect(() => {
    chrome.storage.sync.set(
      { mangaFinishData: mangaFinishData },
      function () {}
    );
  }, [mangaFinishData]);
  function handleNew() {
    setInOptions(false);
    setIsCreatingNew(true);
  }

  function handleSubmitNew(e) {
    e.preventDefault();
    const setFunc = allMangasSet[abasNames[selectedAba]];
    let aux = {
      id: uuidv4(),
      nome: newName ? newName : "NO NAME",
      cap: newCap != undefined ? newCap : 0,
    };
    let newAux = allMangasData[abasNames[selectedAba]];
    newAux.push(aux);
    setFunc(newAux);
    const gSync = googleFunctions[abasNames[selectedAba]];
    gSync(newAux);
    setIsCreatingNew(false);
  }

  function handleChangeAba(id) {
    setSelectedAba(id);
  }
  function switchMangas(abaDestination, mangaId, setFunc) {
    const mangaStruct = [
      mangaData,
      mangaWaitingData,
      mangaLaterData,
      mangaFinishData,
    ];
    if (abaDestination != selectedAba) {
      let data = mangaStruct[selectedAba].filter((mD) => mD.id == mangaId);
      mangaStruct[abaDestination].push(data[0]);
      setFunc(mangaStruct[abaDestination]);
      const gSync = googleFunctions[abasNames[abaDestination]];
      gSync(mangaStruct[abaDestination]);
      return true;
    }
    return false;
  }
  function handleOptions() {
    inOptions ? setInOptions(false) : setInOptions(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <small className="app-title">My Bookmarks</small>
        {!isCreatingNew ? (
          <>
            <div className="createN">
              <a onClick={handleNew} className="text-new">
                <FontAwesomeIcon icon={faPlusCircle} /> New
              </a>
              {!inOptions ? (
                <a className="config-btn" onClick={() => handleOptions()}>
                  <FontAwesomeIcon icon={faCog} /> Options
                </a>
              ) : (
                <a className="config-btn" onClick={() => handleOptions()}>
                  List&nbsp;
                  <FontAwesomeIcon icon={faChevronLeft} color={"green"} />
                </a>
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmitNew}>
            <div className="creatingNew">
              <input
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                name="manga"
                placeholder="manga name"
              ></input>
              <input
                type="number"
                onChange={(e) => setNewCap(parseInt(e.target.value))}
                name="chapter"
                placeholder="chapter"
              />
            </div>
            <button className="newmanga" type="submit">
              +
            </button>
            <button
              className="canceladd"
              onClick={() => setIsCreatingNew(false)}
            >
              close
            </button>
          </form>
        )}
      </header>
      {!inOptions ? (
        <>
          <div className="menu cantSelect">
            <div
              onClick={() => handleChangeAba(0)}
              className={
                "menu-aba " + (selectedAba === 0 ? "aba-selected" : "")
              }
            >
              <small>Reading: {mangaData.length}</small>
            </div>
            <div
              onClick={() => handleChangeAba(1)}
              className={
                "menu-aba " + (selectedAba === 1 ? "aba-selected" : "")
              }
            >
              <small>Waiting: {mangaWaitingData.length}</small>
            </div>

            <div
              onClick={() => handleChangeAba(2)}
              className={
                "menu-aba " + (selectedAba === 2 ? "aba-selected" : "")
              }
            >
              <small>Later: {mangaLaterData.length}</small>
            </div>
            <div
              onClick={() => handleChangeAba(3)}
              className={
                "menu-aba " + (selectedAba === 3 ? "aba-selected" : "")
              }
            >
              <small>Finished: {mangaFinishData.length}</small>
            </div>
          </div>

          <List
            mangaData={allMangasData[abasNames[selectedAba]]}
            setMangaData={allMangasSet[abasNames[selectedAba]]}
            switchManga={switchMangas}
            gSync={googleFunctions[abasNames[selectedAba]]}
          />
        </>
      ) : (
        <Options
          allMangasSet={allMangasSet}
          allMangasData={allMangasData}
          googleFunctions={googleFunctions}
          abasNames={abasNames}
          setInOptions={setInOptions}
        />
      )}
    </div>
  );
}

export default App;
