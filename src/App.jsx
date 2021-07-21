import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import MapExample from "./MapExample"; //from the current folder (.) import MapExample
import Search from "./Search";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/map">
          <MapExample />
        </Route>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

export default App;
