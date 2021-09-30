import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
// pages
import MapTest from "./MapTest.js";
import LandingPage from "./LandingPage.js";

// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/MapTest">
        <MapTest />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
