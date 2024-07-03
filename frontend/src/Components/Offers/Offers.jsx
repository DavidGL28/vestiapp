import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Ofertas</h1>
        <h1>Exclusivas Para Ti</h1>
        <p>PRODUCTOS MAS VENDIDOS</p>
        <button>Checa Ahora</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="" />
      </div>
    </div>
  )
}
