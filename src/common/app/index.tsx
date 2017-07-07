import * as React from "react";
import { Link } from "react-router";
const style = require("./style.css");

export default function({ children }) {
  return (
    <main id="app">
      <nav className={style.nav}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/lol">Lol</Link>
      </nav>
      {children}
    </main>
  );
}
