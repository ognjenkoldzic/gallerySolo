import React from "react";
import ReactDOM from "react-dom/client";
import GalleryApp from "./Gallery/GalleryApp";
import "./index.css";
import Intro from "./Intro.jsx";
import MapApp from "./Map/MapApp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Intro>
      <GalleryApp />
    </Intro> */}
    <MapApp />
  </React.StrictMode>
);
