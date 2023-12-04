require("dotenv").config();

const { prismaClient, PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient();
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World !!")
});

app.get('/products',async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});


app.listen(PORT, ()=>{
    console.log(`server is runing at port : ${PORT}`)
  });