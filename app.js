const express=require('express');
const dotenv=require('dotenv');
require("dotenv").config();
const app=express();
require('./models/db')
require('./models/userModel')
const bodyParser=require('body-parser')
const cookieParser=require("cookie-parser")
app.use(bodyParser.json( ));
const path=require("path");
dotenv.config({path:"./.env"})
const fileupload=require('express-fileupload')


app.use(express.urlencoded({extended:true}))
app.use(fileupload());

const publicdir=path.join(__dirname,'./views')
app.use(express.static(publicdir))
app.use(cookieParser())
//template engine
app.set('view engine','ejs')

//router import
const imgroute=require('./Router/route')
app.use("/api",imgroute);




//connection
const port = process.env.port || 8000;
const server = app.listen(port, () => {
    console.log(`server running  at port no ${port}`);
})