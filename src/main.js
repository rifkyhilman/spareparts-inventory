require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World !!")
});

app.get('/api', (req, res) => {
    res.send("API JALAN")
});


app.listen(PORT, ()=>{
    console.log(`server is runing at port : ${PORT}`)
  });