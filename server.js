const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/users");
const cors = require("cors");

var corsOptions = {
};

PORT = process.env.PORT || 3000
uri = process.env.uri

var corsOptions = {
    origin:"https://genex.onrender.com/"
}
const app = express();
// app.use(cors(corsOptions))
// app.options('*',cors());
// app.use(cors(corsOptions))
app.use(cors({
    origin: '*', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
app.use(express.json(corsOptions))
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