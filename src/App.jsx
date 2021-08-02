import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, useLocation, Router, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Map from "./Map"; //from the current folder (.) import Map
import Search from "./Search";
import ShowFavorites from "./Favorites";
import "./App.css";

function App() {
  // const [user, setUser] = React.useState(false);
  // const { pathname } = useLocation();
  // if (!user && pathname != "/login") {
  //   return <Redirect to="/login" />;
  // }
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container-fluid">
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/favorites">
          <ShowFavorites />
        </Route>
        {/* <Route exact path="/login">
          <Login setUserInfo={setUser} />
        </Route> */}
      </div>
    </BrowserRouter>
  );
}
ReactDOM.render(<App />, document.querySelector("#root"));
export default App;

