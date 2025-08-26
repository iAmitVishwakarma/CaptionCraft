const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
};




async function registerController(req,res){
const {username,password} = req.body;

const existingUser = await userModel.findOne({
    username
}) 

if(existingUser){
    return res.status(409).json({
    message : " username is already exits you use another username " ,
})
}

const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10)
})


const token = jwt.sign({
    id: user._id,
},process.env.JWT_Secret_Key)


res.cookie('token', token, cookieOptions);

res.status(201).json({
    message : " user create succesfully" ,
    user
})
}

async function loginController(req,res) {
    const {username,password} = req.body;

    const user = await userModel.findOne({
    username
}) 

if(!user){
    return res.status(400).json({
    message : "Username is not found" ,
})
}


const isPasswordValid = await bcrypt.compare(password, user.password)

 if(!isPasswordValid){
    return res.status(400).json({
    message : "Password is not match" ,
})
 }

const token = jwt.sign(
    { id: user._id },
    process.env.JWT_Secret_Key,
)

res.cookie('token', token, cookieOptions);

res.status(200).json({
    message : "User login succesfully" ,
    user : {
        id: user._id,
        username: user.username
    }
})  
}


module.exports = {
    registerController,
    loginController
}
