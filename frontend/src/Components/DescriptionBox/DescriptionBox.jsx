import React from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Descripcion</div>
        <div className="descriptionbox-nav-box fade">Opiniones (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>Una tienda en línea es un sitio web donde los consumidores pueden comprar productos o servicios a través de internet. 
            Los usuarios navegan por un catálogo virtual, añaden artículos a un carrito de compras y completan la compra mediante un proceso de pago seguro. 
            Estas tiendas ofrecen diversas opciones de envío y métodos de pago, además de proporcionar soporte al cliente para resolver consultas o problemas.
        </p>
        <p>
        Ejemplos populares incluyen Amazon y eBay, y muchas tiendas físicas también tienen presencia en línea para llegar a más clientes.
        </p>
      </div>
    </div>
  )
}
