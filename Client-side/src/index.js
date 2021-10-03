import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
// pages
import Map from "./Map.js";
import LandingPage from "./LandingPage.js";
import Blog from "./blog/Blog.js";
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
        <Blog />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
