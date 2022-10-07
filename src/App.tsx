import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import logo from "./media/logo192.png";
import "./App.css";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Downloads from "./pages/Downloads";

function App() {
  return (
    <div className="App">
      <header className="appHeader">
        <div className="branding">
          <img src={logo} className="appLogo" alt="logo" />
          <div className="titleGroup">
            <div className="appTitle">qat</div>
            <div className="appSubtitle">programming language</div>
          </div>
        </div>
        <nav className="navBar">
          <NavLink
            className={(props) => {
              return props.isActive ? "navLink-active" : "navLink";
            }}
            to="/"
            end
          >
            Home
          </NavLink>
          <NavLink
            className={(props) => {
              return props.isActive ? "navLink-active" : "navLink";
            }}
            to="/playground"
          >
            Playground
          </NavLink>
          <NavLink
            className={(props) => {
              return props.isActive ? "navLink-active" : "navLink";
            }}
            to="/downloads"
          >
            Downloads
          </NavLink>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/downloads" element={<Downloads />} />
      </Routes>
    </div>
  );
}

export default App;

