import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Map from "./Map"; //from the current folder (.) import MapExample
import Search from "./Search";
import SearchFavorites from "./SearchFavorites";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/favorites">
          <SearchFavorites />
        </Route>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
