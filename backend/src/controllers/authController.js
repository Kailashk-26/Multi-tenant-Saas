import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { superAdmin } from "../config/superAdmin.js";

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


export const signup=async(req,res)=>{
    try{
        const {name,email,password,organizationId}=req.body;

        const exUser=await User.findOne({email});
        if (exUser){
            return res.status(400).json({error:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            organizationId
        }); 
        const token =generateToken(user._id);   
        return res.status(200).json({message:"Signed Up",token,user:{name:user.name,organizationId:user.organizationId}}) 
    }catch(err){
        res.status(500).json({error:err.message||"Error in Signup"})
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        
        const rightPassword=await bcrypt.compare(password,user.password);
        if (!rightPassword){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const token =generateToken(user._id);
        return res.status(200).json({message:"Logged In",token,user:{name:user.name,organizationId:user.organizationId}})
    }catch(err){
        res.status(500).json({error:err.message||"Error in login"})
    }
}

export const superAdminLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(email!==superAdmin.email || password!==superAdmin.password){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const token =generateToken(superAdmin.id);
        return res.status(200).json({message:"Logged In",token})
    }catch(err){
        res.status(500).json({error:err.message||"Error in login"})
    }
}