require("dotenv").config();
const path = require('path');
const express = require("express");

const app = express();
const productController = require("./product/product.controller");
const routes = require("./routes");

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use('/products', productController);
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server is runing at port : ${PORT}`)
  });