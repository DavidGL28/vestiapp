const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 4000
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const { type } = require("os")
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

dotenv.config()

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion
})

app.use(express.json())

app.use(cors())

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((error) => console.log("Error al conectarse a MongoDB:", error));

// API Creation

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

// Image Storage Engine

const storage = multer.memoryStorage()

const upload = multer({storage:storage})

// Creating Upload Endpoint for images 

app.post("/upload", upload.single('ropa'), async (req, res) => {
    try {
        const params = {
            Bucket: bucketName,
            Key: req.file.originalname,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${req.file.originalname}`;
        res.json({
            success: 1,
            image_url: imageUrl,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al subir la imagen" });
    }
});

// Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now, 
    },
    avilable:{
        type: Boolean,
        default: true,
    },
})

// Creating addproduct Endpoint for our products

app.post('/addproduct', async (req, res) => {
    try {
        let products = await Product.find({});
        let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        console.log("Producto guardado");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al guardar el producto" });
    }
});

// Creating API For deleting Products 

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Eliminado")
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API For getting all Products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({})
    console.log("Todos los productos obtenidos")
    res.send(products)
})

// Creating API For User Model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,   
    }
})

// Creating EndPoint for restoring the user

app.post('/signup',async (req,res)=>{
    let check = await Users.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false,errors:"Usuario encontrado con el mismo correo electronico"})
    }
    let cart = {}
    for (let i = 0; i < 300; i++) {
        cart[i]=0        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save()

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})

})

// Creating endpoin for user login

app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if(user){
        const passCompare = req.body.password === user.password 
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Contraseña Incorrecta"})
        }
    }
    else{
        res.json({success:false,errors:"Correo Electronico Incorrecto"})
    }
})

// Creating endpoint for newcollection data 

app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-8)
    console.log("Nuevos catalogos obtenidos")
    res.send(newcollection)
})

// Creating endpoint for popular in woman section 

app.get('/popularinwomen', async (req,res) =>{
    let products = await Product.find({category:"mujeres"})
    let popular_in_women = products.slice(0,4)
    console.log("Tendencias en mujeres obtenidos")
    res.send(popular_in_women)
})

// Creating middelware to fetch user

    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token')
        if (!token){
            res.status(401).send({errors:"Por favor valida con clave valida"})
        }
        else{
            try{
                const data = jwt.verify(token,'secret_ecom')   
                req.user = data.user
                next()
            } catch (error) {
                res.status(401).send({errors:"Por favor valida con clave valida"})
            }
        }
    }

// Creating endpoint for adding products in cartdata

app.post('/addtocart', fetchUser, async (req,res) =>{
    console.log("Agregado",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Agregado")
})

// Creating endpoint to remove product from cartdata

app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("Eliminado",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Eliminado")
})

// Creating endpoint to get cartdata

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("GetCart");
    try {
        let userData = await Users.findOne({_id: req.user.id});
        
        if (!userData) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.json(userData.cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});


app.listen(port,(error)=>{
    if (!error){
        console.log("Server corriendo en puerto "+port)
    }
    else{
        console.log("Error : "+error)
    }
})