import React, { useContext, useRef, useState } from "react";
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from '../Assets/nav_dropdown.png'

const Navbar = () => {

    const [menu,setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef()

    const dropdown_toggle = (e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

  return(
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt=''/>
        <p>VestiApp</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'><p>Inicio</p></Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("hombres")}}><Link style={{textDecoration: 'none'}} to='/hombres'><p>Hombres</p></Link>{menu==="hombres"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mujeres")}}><Link style={{textDecoration: 'none'}} to='/mujeres'><p>Mujeres</p></Link>{menu==="mujeres"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("niños")}}><Link style={{textDecoration: 'none'}} to='/niños'><p>Niños</p></Link>{menu==="niños"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')?
        <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}} >Cerrar Sesion</button>
        :<Link to='/inicioSesion'><button>Inicio de Sesion</button></Link>}
        <Link to='/carro'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar 