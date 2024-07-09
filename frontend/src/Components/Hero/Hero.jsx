import React from 'react'
import './Hero.css'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

export const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>Recien Llegados</h2>
        <div>
            <p>nuevos</p>
            <p>catalogos</p>
            <h1>nuevo look</h1>
        </div>
        <div className="hero-latest-btn">
            <div>Catalogos disponibles</div>
            <img src={arrow_icon} alt="" />
        </div> 
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>  
    </div>
  )
}
