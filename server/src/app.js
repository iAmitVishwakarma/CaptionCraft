//
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRotes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes');

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'https://captioncraft-ai.onrender.com' , // 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
  

app.use("/api/auth", authRotes)
app.use("/api/posts", postRoutes)

app.get('/', (req,res)=>{
    res.send( "welcome")
})

module.exports = app;
