const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Users = require('./Schemas/Users')
const Products = require('./Schemas/Products')

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

app.post("/signup", async (req, res)=>{
    const accountExists =await Users.exists({email:req.body.email})
    console.log(accountExists)
    if(accountExists){
        res.status(201)
        res.send("Account Exists");
    }
    else{

        Users.create({
            name:req.body.name, 
            email:req.body.email,
            password:req.body.password,
            role:req.body.role,
            disabled:false
        })
        res.status(200)
        res.send("Account Created")
    }

})

app.post('/login', async (req, res)=>{
    console.log(req.body);
    const accountExists = await Users.exists({email:req.body.email, password:req.body.password, disabled:false});
    if(accountExists){
        res.status(200)
        const userDetails = await Users.findOne({email:req.body.email, password:req.body.password})
        res.send(userDetails);
    }else{
        res.status(201);
        res.send(false)
    }
})


app.post('/addProduct', async(req, res)=>{
    Products.create({
        vendor_name:req.body.vendor_name,
        // email:req.body.email,
        approved: false,
        // images:req.body.images,
        product_name:req.body.product_name,
        desc:req.body.desc,
        price:req.body.price,
        category:req.body.category
    })

    // Products.create({
    //     vendor_name:"Deepanshu",
    //     product_name:"Iphone",
    //     approved:"false",
    //     desc:"Vivo V 27",
    //     price: "$1200", 
    //     category:"Mobiles"
    // })
    res.send("done")
})

app.post('/productAdded', (req, res)=>{
    console.log(req.body)
    res.send("Done")
})


app.get('/getProduct', async (req, res)=>{
    const x = await Products.find();
    res.send(x);
})

app.post('/myProduct', async(req, res)=>{
    const data = await Products.find({vendor_name:req.body.vendor_name})
    console.log(data)
    res.send(data);
})


app.post('/addToCart', async (req, res)=>{
    // console.log(req.body)
    const data = await Users.findOne({email:req.body.customer_email})
    // console.log(data)
    let userCart = data.cart
    // console.log(userCart)
    userCart.push([req.body.product_uid, 1])
    console.log(userCart)
    await Users.updateOne({email:req.body.customer_email}, {cart:userCart})
    res.send("done")
    // console.log("done")
})

app.post('/getCartItems', async(req, res)=>{
    const data = await Users.findOne({email:req.body.customer_email})
    res.send(data)
})

app.post('/getCartProduct', async (req, res)=>{
    const data = await Products.findOne({_id:req.body.product_id})
    console.log(data)
    res.send(data)
})


app.listen(5000, ()=>{
    console.log("server started")
})

