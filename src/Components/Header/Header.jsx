import React from 'react'
import { Link } from 'react-router-dom'
import {ImSearch} from "react-icons/im"

import logo from "../../images/netflixLogo.png"

const Header = () => {
  return (
    <nav className="header">
           <img src={logo} alt="This is Logo" />

    <div>
        <Link to="tvShow"> TV Shows</Link>
        <Link to="tvShow"> Movies </Link>
        <Link to="tvShow"> Recently Added </Link>
        <Link to="tvShow"> My List </Link>
    </div>
    <ImSearch />
    </nav>    
  )
}

export default Header