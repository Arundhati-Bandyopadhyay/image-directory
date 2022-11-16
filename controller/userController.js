//const{ Sequelize,Op} =require('sequelize');
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const bcrypt=require("bcryptjs")
const dotenv = require('dotenv');
dotenv.config({path:"../config/.env"})


const User = db.users;

//register
const postUsers = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    var postData ={
    firstName : req.body.firstName,
    lastname : req.body.lastName,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password, salt)
    };

  
     const token = jwt.sign(
      { user_id: postData._id },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
     );
    // save user token
    postData.token = token;

    console.log(postData);
    //console.log(token);
    const Data = await User.create(postData);

    var msg = "created";
    res.status(200).json({ alertMsg: msg });
  } catch (err) {
    console.log(err);
    //return res.render("register");
  }
};

//login
const loginUser=async(req,res)=>{
 var email=req.body.email;
 var password=req.body
 try {
  const user = await User.findOne({

    where: {
      email: email
    }})

    if(user){
    const password_valid = await bcrypt.compare(req.body.password,user.password);
    if(password_valid){

       const token = jwt.sign(
      { user_id: user._id,email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
     );
  
  res.status(200).json({message:"you are logged in"})

 // console.log(user);
  } else {
    res.status(400).json({ error : "Password Incorrect" });
  }
  }else{
    res.status(404).json({ error : "User does not exist" });
  }
}catch(err){
  console.log(err);
}
}


//delete
const deleteUser=async(req,res)=>{
  try{
  const data=await User.destroy({
    where:{
      id:req.params.id
    }
  })
  res.status(200).send({message:"deleted"})

}catch(err){console.log(err);

}
}
//update
const updateUser=async(req,res)=>{
  id=req.params.id;
  const userN=await User.update(req.body,{where:{id:id}});
  res.status(200).send(userN)
} 

module.exports = {
  postUsers,
  loginUser,
  deleteUser,
  updateUser
};


//update


