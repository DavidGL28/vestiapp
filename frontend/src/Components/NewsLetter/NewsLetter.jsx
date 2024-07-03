import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Regístrate Para Recibir Ofertas Exclusivas</h1>
      <p>Subscribete y mantente actualizado</p>
      <div>
        <input type="email" placeholder='ID del email' />
        <button>Subscribirse</button>
      </div>
    </div>
  )
}
