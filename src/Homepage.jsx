import React from 'react';
import Search from "./Search";

export default function Homepage(props) {
  return (
    <div id="home-banner" className="row">
      <div className="col">
        <h1>Rooftop Bar Finder!</h1>
        <p className="lead">Find the best bar.</p>
        <Search />

      </div>
    </div>
  );
}
