import React from "react";
import MapFramed from "./assets/MapFrame.png";
import GalleryFramed from "./assets/GalleryFrame.png";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="appBody font-face-gm">
      <h1>Baroque Art</h1>
      <Link to="/gallery">
        <img src={GalleryFramed} alt="Galleriebild mit Rahmen" />
        <h2>...in heaven</h2>
      </Link>
      <Link to="/map">
        <img src={MapFramed} alt="Kartenbild mit Rahmen" />
        <h2>...on earth</h2>
      </Link>
    </div>
  );
}

export default App;
