const USER_SCHEMA = require("../models/usermodel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
exports.signUp = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    let user = await USER_SCHEMA.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already existing" });
    }

    user = new USER_SCHEMA({
      email,
      username,
      password: await bcrypt.hash(password, 10),
    });

    // save the details

    await user.save();
    return res.status(201).json({ message: "user registration successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser=async(req,res) => {
    const {username,password}=req.body
    try {
        let user =await USER_SCHEMA.findOne({username})
    if (!user) {
      return res.status(400).json({ message: "user not found" });  
    }

    const isMatch=await bcrypt.compare(password,user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "wronge password" });  
        
    }
    // return res.status(201).json({ message: "login successfuly" });

    const token =jwt.sign({id:user._id,username:user.username},JWT_SECRET,{
        expiresIn:"1d"
    })
    res.cookie("jwt",token,{httpOnly:true})
    return res.status(201).json({ message: "login successfuly" ,token});

        
    } catch (error) {
    res.status(500).json({ message: error.message });
        
    }
}

exports.logout=async (req,res) => {
  try {
     res.cookie("jwt" ," " ,{expiresIn:1})
     return res.status(200).json({ message: "logout successfully"});

  } catch (error) {
      res.status(500).json({message:error.message})

  }
  
}
