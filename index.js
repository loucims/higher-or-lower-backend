import express from "express";
import routes from "./routes/routes.js";
import morgan from "morgan";
import dbConnection from "./dbConnection/dbConnection.js";

const app = express();

app.use(morgan("tiny"))
app.use(express.json()) //permite decodificar y traer body de json
app.use(express.urlencoded({extended:true})) //permite decodificar y traer body de Form-encode

app.use(routes);


app.use((req,res,next) =>{
  res.status(404).send({success:false,message:"not found"});
});

await dbConnection.sync();

app.listen(8080,()=>{
  console.log("Express ok");
})




/*const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})*/