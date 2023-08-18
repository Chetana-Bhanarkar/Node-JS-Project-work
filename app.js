const user = require('./api/user.api');
const userAddress = require('./api/userAddress.api');

const express = require('express');

const app = express();


// app.use(express.json())

app.use('/',user);
app.use('/',userAddress);

app.listen(3000,()=>{
    console.log("Server update");
})