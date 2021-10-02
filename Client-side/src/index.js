import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
// pages
import Map from "./Map.js";
import LandingPage from "./LandingPage.js";
import App from './App'
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/Map">
        <Map />
      </Route>
      <Route exact path="/LandingPage">
        <LandingPage />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
