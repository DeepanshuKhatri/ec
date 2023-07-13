const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./Schemas/Users");
const Products = require("./Schemas/Products");
const Cart = require("./Schemas/Cart");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

app.post("/signup", async (req, res) => {
  const accountExists = await Users.exists({ email: req.body.email });
  console.log(accountExists);
  if (accountExists) {
    res.status(201);
    res.send("Account Exists");
  } else {
    Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      disabled: false,
    });
    res.status(200);
    res.send("Account Created");
  }
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const accountExists = await Users.exists({
    email: req.body.email,
    password: req.body.password,
    disabled: false,
  });
  if (accountExists) {
    res.status(200);
    const userDetails = await Users.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    res.send(userDetails);
  } else {
    res.status(201);
    res.send(false);
  }
});

app.post("/addProduct", async (req, res) => {
  Products.create({
    vendor_name: req.body.vendor_name,
    // email:req.body.email,
    approved: false,
    // images:req.body.images,
    product_name: req.body.product_name,
    desc: req.body.desc,
    price: req.body.price,
    category: req.body.category,
  });

  res.send("done");
});

app.post("/productAdded", (req, res) => {
  console.log(req.body);
  res.send("Done");
});

app.get("/getProduct", async (req, res) => {
  const x = await Products.find();
  res.send(x);
});

app.post("/myProduct", async (req, res) => {
  const data = await Products.find({ vendor_name: req.body.vendor_name });
  console.log(data);
  res.send(data);
});

// app.post("/addToCart", async (req, res) => {
//   const cartExists = await Cart.findOne({email:req.body.buyer_email, product_id: req.body.product_id})
//   console.log(cartExists)
//   if(cartExists){
//     await Cart.updateOne({email:req.body.buyer_email, product_id: req.body.product_id},{$inc:{quantity:1}})
//     res.send("updated")
//   }
//   else{
//     const data = await Products.findOne({ _id: req.body.product_id });
//     Cart.create({
//         email: req.body.buyer_email,
//       product_id: req.body.product_id,
//       buyer_name: req.body.buyer_name,
//       quantity: 1,
//       vendor_name: data.vendor_name,
//       category: data.category,
//     })
//     res.send("Added")
//   }

// });

app.post("/getCartItems", async (req, res) => {
  console.log(req.body)
  const data = await Cart.find({ email: req.body.customer_email });
  res.send(data);
});

app.post("/getCartProduct", async (req, res) => {
  const data = await Products.findOne({ _id: req.body.product_id });
  console.log(data);
  res.send(data);
});

app.post('/removeFromCart', async(req, res)=>{
    await Cart.updateOne({email:req.body.buyer_email, product_id: req.body.product_id},{$inc:{quantity:-1}})

  })

app.listen(5000, () => {
  console.log("server started");
});
