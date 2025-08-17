require('dotenv').config()
const app = require("./src/app")
const conntectDB = require("./src/db/db")

conntectDB()



app.listen(3000, ()=>{
    console.log("server is running on 3000");
})