import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import logoPath from "./images/champagne.png";

export default function Navbar(props) {
  return (
    <nav>
      <Link
        to="/"
        className="havbar-brand d-flex justify-content-center"
      >
        <img src={logoPath} height="30" />
        <span>Rooftop Bar Finder</span>
      </Link>

      <section className="d-flex justify-content-end">
        {/* <NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Map?
        </NavLink> */}
        <NavLink
          to="/favorites"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Show My Favorites
        </NavLink>
        <NavLink
          to="/logout"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Logout
        </NavLink>
      </section>
    </nav>
  );
}
