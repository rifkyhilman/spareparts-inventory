require("dotenv").config();
const express = require("express");

const app = express();
const productController = require("./product/product.controller");

const PORT = process.env.PORT;

app.use(express.json());
app.use('/products', productController);

app.listen(PORT, () => {
    console.log(`server is runing at port : ${PORT}`)
  });