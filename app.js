const user = require('./api/user.api');

const express = require('express');

const app = express();


// app.use(express.json())

app.use('/',user);

app.listen(3000,()=>{
    console.log("Server update");
})