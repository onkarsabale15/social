import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
function Navbar() {
  const {state, dispatch} = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <>
          <li><Link to="/upload"><i className="fa-solid fa-arrow-up-from-bracket"></i></Link></li>
          <li><Link to="/profile"><i className="fa-solid fa-user fa-xl"></i></Link></li>
          <li><Link to="/signin" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            // window.location.reload()
          }}><i className="fa-solid fa-right-from-bracket"></i></Link></li>
        </>
      ]
    } else {
      return [
        <li><Link to="/signin"><i className="fa-solid fa-right-to-bracket"></i></Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper navi">
        <Link to={state?"/":"/signin"} className="brand-logo left b">Social</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar