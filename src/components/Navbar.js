import React, { useState } from "react";
import "../navbar.css";

function Navbar() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const token = localStorage.getItem('token');
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <nav className="nav">
      <a href="/" className="nav__brand">
        herdoy
      </a>
      <ul className={active}>
        {/* <li className="nav__item">
          <a href="#" className="nav__link">
            Home
          </a>
        </li> */}
        <li className="nav__item">
          <a href="/players" className="nav__link">
            Players
          </a>
        </li>
        {/* <li className="nav__item">
          <a href="#" className="nav__link">
            Portfolio
          </a>
        </li>
        <li className="nav__item">
          <a href="#" className="nav__link">
            Skills
          </a>
        </li> */}
        {token ? (
		<>
        <li className="nav__item">
          <a href="/logout" className="nav__link">
            Logout
          </a>
        </li>
        </>
        ) : (
        <>
        <li className="nav__item">
          <a href="/login" className="nav__link">
            Login
          </a>
        </li>
        <li className="nav__item">
          <a href="signup" className="nav__link">
            Signup
          </a>
        </li>
        </>
        )}
      </ul>
      <div onClick={navToggle} className={icon}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </nav>
  );
}

export default Navbar;