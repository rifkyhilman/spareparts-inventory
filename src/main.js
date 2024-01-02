// imports
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// use bootstrap
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')))
app.use("/icons", express.static(path.join(__dirname, '../node_modules/boxicons')));

// set tempalate engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// route prefix
app.use('/', require("./routes"));
app.use('/products', require("./product/product.controller"));  





// middlewares
app.use(
  session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});


app.listen(PORT, () => {
    console.log(`server is runing at port : ${PORT}`)
  });