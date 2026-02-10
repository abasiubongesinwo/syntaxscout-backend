const  jwt  = require("jsonwebtoken")
const User = require("../../models/user.model");

async function members(req,res,next){

    if(!req.headers.authorization){
        return res.status(400).json({
              status: "fail",
              message: "No authorization headers sent",
            });
    }

const token= req.headers.authorization.split(' ')[1]

if(!token){
   return res.status(401).json({
        status:'fail',
        message:'No token provided'
    })
}

let isValidToken;
try{

     isValidToken = await jwt.verify(token, process.env.PRIVATE_KEY);
    console.log({isValidToken})
}catch{

           return res.status(401).json({
             status: "fail",
             message: "User is not logged in. Please login and try again",
           });
 
}


  if (!isValidToken ) {
    return res.status(401).json({
      status: "fail",
      message: "User is not logged in. Please login and try again",
    });
  }


console.log({isValidToken});

const user=await User.findById({_id:isValidToken.id})
console.log(user);

if (!user) {
  return res.status(401).json({
    status: "fail",
    message: "User not found",
  });
}


    res.status(200).json({
        status:'success',
        message:'Members fetched successfully',
        user

    })

}
module.exports=members