import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'> 
       <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>Vestiapp</p>
            <h1>Panel de Gestion</h1>
       </div>
       <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar