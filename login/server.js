const express = require('express');
require('dotenv').config();


const router = require('./routes/userroutes')
const server = express();
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
server.use(cors(corsOptions));

server.use(express.urlencoded({extended:true}))
server.use(express.json())


 server.use(router) 
  


const port = 8050;
server.listen(port, ()=>{
    console.log(`sever runing`)
})
