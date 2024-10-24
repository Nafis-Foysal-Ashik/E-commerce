import validator from "validator";   
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

//token creat function by passing id as parameter
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for user login
const loginUser = async (req,res) =>{

    try
    {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User does not exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false, message:'Invail Password'})
        }

    }catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


//Route for user register
const registerUser = async(req,res) =>{
    try{

        const {name,email,password}=req.body;

        //checking the user already exits or not
        const exists = await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"User already exists"})
        }

        //validating email and password format
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedpassword
        })

        const user = await newUser.save()
        //we will generate token for each id.
        //id generate default in database
        const token = createToken(user._id)

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//Route for admin login
const adminLogin = async(req,res)=>{

}

export {loginUser , registerUser , adminLogin}
