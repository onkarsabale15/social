import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav>
    <div className="nav-wrapper navi">
      <Link to="/" className="brand-logo left b">Social</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="/upload"><i className="fa-solid fa-arrow-up-from-bracket"></i></Link></li>
        <li><Link to="/signin"><i className="fa-solid fa-right-to-bracket"></i></Link></li>
        <li><Link to="/profile"><i className="fa-solid fa-user fa-xl"></i></Link></li>
      </ul>
    </div>
  </nav>
  )
}

export default Navbar