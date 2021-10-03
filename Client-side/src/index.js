import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
// pages
import Map from "./Map/Map.js";
import LandingPage from "./LandingPage/LandingPage.js";
import Results from "./results/Results.js";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/Map">
        <Map />
      </Route>
      <Route exact path="/Results">
        <Results />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
