import React, { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import useGeoLocation from "./useGeoLocation";
import "./App.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import { useHistory } from "react-router-dom";
// import turf from "@turf/area";
var coordinates;
var dataResults;
mapboxgl.accessToken =
  "pk.eyJ1IjoiamFkbWF0dGEiLCJhIjoiY2toc3phc2piMDN6YjJzb3l5MGgybDR4aSJ9.L9-ctcz9go1A5j7tspYQiQ";
export default function Map() {
  const history = useHistory();
  const [lng, setLng] = useState(36.0862684249878);
  const [lat, setLat] = useState(33.9171794499001);
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
        console.log(data.features[0].geometry);
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
                dataResults = data["features"][0]["properties"];
                
                if (dataResults.found == false) {
                  alert("We do not have data for this location yet! Check back soon! :)")
                } else {
                history.push("Results", {
                  airHumidity: dataResults.Air_Humidity,
                  airSpeed: dataResults.Air_Speed,
                  atmosphericPressure: dataResults.Atmospheric_Pressure,
                  carbonMonoxide: dataResults.Carbon_Monoxide,
                  soilHumidity: dataResults.Soil_Humidity,
                  temperature: dataResults.Temperature,
                  droneVege: dataResults.Vege_Ratio_Drone,
                  nasaVege: dataResults.non_tree_v,
                  long: dataResults.longitude,
                  lat: dataResults.latitude  
                });
              }
                console.log(dataResults);
              })
              .catch((error) => console.log(error));
            // history.push("Results", {data:dataResults.Air_Humidity});

          }}
        >
          Process Region
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