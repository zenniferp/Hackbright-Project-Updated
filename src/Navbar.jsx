import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import logoPath from "./images/champagne.png";

export default function Navbar(props) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <Link
        to="/"
        className="havbar-brand d-flex justify-content-center nav-link"
      >
        <img src={logoPath} height="30" />
        <span class="text-white"><b>Rooftop Bar Finder</b></span>
      </Link>

      <section className="d-flex justify-content-end">
        <NavLink
          to="/favorites"
          activeClassName="navlink-active"
          className="nav-link nav-item text-white"
        >
          <b>Show My Favorites</b>
        </NavLink>
        <NavLink
          to="/logout"
          activeClassName="navlink-active"
          className="nav-link nav-item text-white"
        >
          <b>Logout</b>
        </NavLink>
      </section>
    </nav>
  );
}
