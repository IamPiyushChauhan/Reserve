import React from 'react';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="brand-title">Reverse</div>
      <a  className="toggle-button">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className="navbar-links">
        {/* <ul>
          <li><a >Home</a></li>
          <li><a>About</a></li>
          <li><a >Contact</a></li>
        </ul> */}
      </div>
    </nav>
  );
}

export default NavBar;
