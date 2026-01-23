const  jwt  = require("jsonwebtoken")
const {loginvalidator} = require("../../joi/user.joi");
const User = require("../../models/user.model");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
const body = req.body
console.log(body)

const { value, error } = loginvalidator(body);
if(error){
    return res.status(400).json({
        "message": error.details[0].message
    })
}

const user = await User.findOne({email: value.email})
if(!user){
    return res.status(400).json({message: "User does not exist" } )}

const isPassMatch = await bcrypt.compare(value.password, user.password)
if(!isPassMatch){
    return res.status(400).json({message: "Invalid credentials" } )
}


const token = await jwt.sign({ email: user.email, id: user._id }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

 res.send({
    message: "user loggedIn successfully",
    data: {
        email: user.email,
        token: token
    }
})

}

module.exports=  login