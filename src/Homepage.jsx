import React from 'react';
import Search from "./Search";
import bar from "./images/bar.jpg";
import "./App.css";

export default function Homepage(props) {
  return (
    <div id="home-banner" className="row" >
      <div className="col-title py-5">
        <h1 class="display-1">Find the perfect bar</h1>
        <Search />
      </div>
    </div>
  );
}
