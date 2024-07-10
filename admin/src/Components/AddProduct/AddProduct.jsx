import React, { useContext, useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false)
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"mujeres",
        new_price:"",
        old_price:""
    })

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }
    const changeHandler = (e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }
    const Add_Product = async ()=>{
        console.log(productDetails)
        let responseData 
        let product = productDetails

        let formData = new FormData()
        formData.append('ropa',image)

        await fetch('https://vestiapp-backend.onrender.com/upload',{
          method:'POST',
          headers:{
            Accept:'application/json',
          },
          body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data})
        if(responseData.success){
          product.image = responseData.image_url
          console.log(product)
          await fetch('https://vestiapp-backend.onrender.com/addproduct',{
            method: 'POST',
            headers:{
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(product),
          }).then((resp)=>resp.json()).then((data)=>{
              data.success?alert("Producto añadido"):alert("Fallido")
          })
        } 
    }


  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Nombre del producto</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Escriba aqui' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Precio</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Escriba aqui' />
        </div>
        <div className="addproduct-itemfield">
            <p>Precio de oferta</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Escriba aqui' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Categoria del producto</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
            <option value="mujeres">Mujeres</option>
            <option value="hombres">Hombres</option>
            <option value="niños">Niños</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={()=>{Add_Product()}} className='addproduct-btn' >AÑADIR</button>
    </div>
  )
}

export default AddProduct