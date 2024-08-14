import React from 'react'
import './CSS/Auth.css'

export const Auten = () => {    

    return (
        <div class="auth">
            <div id="divAuth">
                <h1 id="titleAuth">Two factor Authentication</h1>
                <img src="" id="qrImage"></img>
                <form id="formAuth">
                    <input type="text" id="txtAuth" placeholder="Ingresa codigo 2FA"></input><br></br>
                    <button id="btnAuth" type="submit">Enviar</button>
                </form>                
            </div>        
        </div>
    )
}