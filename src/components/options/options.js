import React, { useEffect, useState } from "react";
import "./options.css";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faDownload,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";

function Options({
  allMangasSet,
  allMangasData,
  googleFunctions,
  abasNames,
  setInOptions,
}) {
  function downloadTxtFile() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(allMangasData)], {
      type: "text/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "backup.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }
  function updateMangaData(obj) {
    for (let i in abasNames) {
      const func = allMangasSet[abasNames[i]];
      func(obj[abasNames[i]]);
    }
    setInOptions(false);
  }
  async function handleUploadBackup(e) {
    let reader = new FileReader();
    reader.onload = async function (e) {
      let jsonObj = await JSON.parse(e.target.result);
      updateMangaData(jsonObj);
    };

    reader.readAsText(e.target.files[0]);
  }
  return (
    <div className="opt-container">
      <p className="opt-title">Backup</p>
      <div className="backupMenu">
        <a className="bckp-btn" onClick={() => downloadTxtFile()}>
          <FontAwesomeIcon icon={faDownload} /> Download
        </a>
        <a
          className="up-bckp-btn"
          onClick={() => {
            const element = document.getElementById("upload_bckp");
            element.click();
          }}
        >
          <FontAwesomeIcon icon={faFileUpload} /> Upload
        </a>
        <input
          style={{ display: "none" }}
          type="file"
          id="upload_bckp"
          onChange={handleUploadBackup}
        />
      </div>
    </div>
  );
}
export default Options;
