import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import useGeoLocation from "./useGeoLocation";
import "./App.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
// import turf from "@turf/area";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFkbWF0dGEiLCJhIjoiY2toc3phc2piMDN6YjJzb3l5MGgybDR4aSJ9.L9-ctcz9go1A5j7tspYQiQ";

export default function Map() {
  const [lng, setLng] = useState(36.0862684249878);
  const [lat, setLat] = useState(33.91717944990014);
  const [zoom, setZoom] = useState(17);

  // console.log(location.coordinates);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v8",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
    });
    map.addControl(draw, "top-right");

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      if (e.type !== "draw.delete") {
        console.log(data.features[0].geometry.coordinates);
        coordinates = data.features[0].geometry.coordinates;
        var temp = "";
        for (var j in data.features[0].geometry.coordinates) {
          for (var p in data.features[0].geometry.coordinates[j]) {
            for (
              var i = 0;
              i < data.features[0].geometry.coordinates[j][p].length;
              i++
            ) {
              temp += data.features[0].geometry.coordinates[j][p][i] + "   ";
            }
            temp += "\n";
          }
        }
        alert(temp);
      }
      const answer = document.getElementById("calculated-area");
      if (data.features.length > 0) {
        console.log(turf);
        const area = turf.area(data);
        // Restrict the area to 2 decimal points.
        const rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
      } else {
        answer.innerHTML = "";
        if (e.type !== "draw.delete") alert("Click the map to draw a polygon.");
      }
    }

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebar">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <button
          className="button"
          onClick={() => {
            alert("coordinates: " + lng + ", " + lat);
            console.log("coordinates: " + lng + ", " + lat);
          }}
        >
          Print Location
        </button>
        <button
          className="button"
          onClick={() => {
            fetch(`/get_coordinates`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(coordinates),
            })
              .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                const items = data;
                console.log(items);
              })
              .catch((error) => console.log(error));
          }}
        >
          Process Data
        </button>
      </div>
      <div className="calculation-box">
        <p>Click the map to draw a polygon.</p>
        <div id="calculated-area"></div>
      </div>
      <div className="map-container" id="map" />
    </div>
  );
}
