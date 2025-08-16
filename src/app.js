const express = require("express");
const authRotes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
//require('.src/service/ai.service.js');
const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRotes)
app.use("/api/posts", postRoutes)

app.get('/', (req,res)=>{
    res.send( "welcome")
})

module.exports = app;