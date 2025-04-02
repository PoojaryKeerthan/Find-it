import User from "../models/UserModel.js"
import createError from "../utils/appError.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signup = async(req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email})
        if(user){
            return next(new createError('user already exists',400));
        }
        const hashPassword = await bcrypt.hash(req.body.password,12);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });
        await newUser.save();
        const token = jwt.sign({_id:newUser._id},process.env.SECRET_KEY,{expiresIn:"90d"})
        res.status(201).json({
            status: "success",
            message: "User registered successfully. Please log in.",
        });
    }
    catch(err){
        next(err)
    }
}

const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return next(new createError('User not found',404));
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return next(new createError('Invalid credentials',401));
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY,{expiresIn:"90d"})
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", 
            maxAge: 90 * 24 * 60 * 60 * 1000 
        });
        res.status(200).json({
            status:'success',
            message: 'User logged in successfully',
            token: token,
            username : user.name,
            userId : user._id,
            email : user.email,
            role : user.role
        })
    } catch (error) {
        next(error);
    }
}
export default {signup,login}