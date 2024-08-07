import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const LoginSignup = () => {
  const [state, setState] = useState("Iniciar Sesion");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!isValidEmail(formData.email)) {
      alert("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (!formData.password) {
      alert("Por favor ingrese una contraseña.");
      return;
    }

    console.log("Inicio de sesion exitoso", formData);
    let responseData;
    await fetch('https://vestiapp-backend.onrender.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/form-Data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    if (!formData.username) {
      alert("Por favor ingrese un nombre de usuario.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Por favor ingrese un correo electrónico válido.");
      return;
    }

    if (!formData.password) {
      alert("Por favor ingrese una contraseña.");
      return;
    }

    console.log("Registro Exitoso", formData);
    let responseData;
    await fetch('https://vestiapp-backend.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/form-Data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Registrarse" && (
            <input
              name='username'
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder='Nombre'
            />
          )}
          <input
            name='email'
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder='Correo Electronico'
          />
          <input
            name='password'
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder='Contraseña'
          />
        </div>
        <button onClick={() => { state === "Iniciar Sesion" ? login() : signup() }}>
          Continuar
        </button>
        {state === "Registrarse" ? (
          <p className="loginsignup-login">
            Ya tienes una cuenta?
            <span onClick={() => { setState("Iniciar Sesion") }}>
              Inicia sesion aqui
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Crear una cuenta?
            <span onClick={() => { setState("Registrarse") }}>
              Pulse aqui
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar, acepto el uso de termnos y condiciones de uso.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
