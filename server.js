const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/users");
const app = express();
const cors = require("cors");

PORT = process.env.PORT || 3000
uri = process.env.uri

function myCors(req, res, nxt) {
    res.header('Access-Control-Allow-Origin', 'https://jitbherwaniofficial.github.io');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');
    if(req.method === 'OPTIONS') {
        res.sendStatus(204);
    }
    else {
        nxt();
    }
}

app.use(myCors)

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/user",userRoute)

app.use((req,res)=>{
    res.status(404).json({
        error:"Bad Request"
    })
})

mongoose.connect(uri);
mongoose.connection.on("error",(err)=>{
    console.log("connection failed");
});

mongoose.connection.on("connected",(connected)=>{
    console.log("Database Connected");
})


app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}`);
})