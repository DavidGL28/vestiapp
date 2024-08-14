import React from 'react'
import './CSS/LoginSignup.css'
import { useState } from 'react'

export const LoginSignup = () => {

  const [state,setState] = useState("Iniciar Sesion")
  const [formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    console.log("Inicio de sesion exitoso",formData)
    let responseData
    await fetch('https://vestiapp-backend.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-Data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/autenticacion")
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () =>{
    console.log("Registro Exitoso",formData)
    let responseData
    await fetch('https://vestiapp-backend.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-Data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Registrarse"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Nombre' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Correo Electronico' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Contraseña' />
        </div>
        <button onClick={()=>{state==="Iniciar Sesion"?login():signup()}} >Continuar</button>
        {state==="Registrarse"
        ?<p className="loginsignup-login">¿Ya tienes una cuenta?<span onClick={()=>{setState("Iniciar Sesion")}} > Inicia sesion aqui</span></p>:
        <p className="loginsignup-login">¿Crear una cuenta?<span onClick={()=>{setState("Registrarse")}} > Pulse aqui</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='checkTerminos' />
          <p>Al continuar, acepto el uso de termnos y condiciones de uso.</p>
        </div>
      </div>
    </div>
  )
}
