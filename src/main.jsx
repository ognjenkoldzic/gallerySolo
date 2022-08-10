import React from "react";
import ReactDOM from "react-dom/client";
import GalleryApp from "./Gallery/GalleryApp";
import "./index.css";
import Intro from "./Intro.jsx";
import MapApp from "./Map/MapApp";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<GalleryApp />} />
        <Route path="/map" element={<MapApp />} />
        {/* <Intro>
      <GalleryApp />
    </Intro> */}
        {/* <MapApp /> */}
        {/* <App /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
