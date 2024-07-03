import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Registrarse</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Nombre' />
          <input type="email" placeholder='Correo Electronico' />
          <input type="password" placeholder='Contraseña' />
        </div>
        <button>Continuar</button>
        <p className="loginsignup-login">Ya tienes una cuenta?<span> Inicia sesion aqui</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto el uso de termnos y condiciones de uso.</p>
        </div>
      </div>
    </div>
  )
}
