const emailValidator = require('email-validator');
const userModel = require("../model/userSchema.js");
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const nodemailer = require('nodemailer');



let otps = {};


const signUp = async (req , res ,next) => {

    const {name , email , password , confirmPassword , followers } = req.body;

    if(!name || !email || !password || !confirmPassword || !followers) {
        return res.status(400).json({
            success : false , 
            message: 'Every filed is required'
        });
    }

    const validEmail = emailValidator.validate(email);

    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
        });
    }

    try{
        confirmPassword
        if (!confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'password and confirm shoul be same'
            });
        }

        const userInfo = new userModel(req.body);
        const result = await userInfo.save();
        return res.status(200).json({
            success: true,
            data : result
        });
    } catch( error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }
}


const signIn = async (req , res , next) => {
    const {email , password} = req.body;

    if ((!email || !password)) {
        return res.status(400).json({
            success:false,
            message: ' email and password are required'
        });
    }


    try {
        const user = await userModel.findOne({
            email
    }).select('+password')
        
        const checkPassword = await bcrypt.compare(password , user.password);

        if (!user || !(checkPassword)) {
             return res.status(400).json({
                success:false,
                message: 'invalis credentials'
             });
        }


        const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            httpOnly : true,
            maxAge: 24 * 60 * 60 *1000,
        };
        res.cookie('token' , token , cookieOption)
        
        res.status(200).json({
            success:true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message: error.message
        });
    }
}


const getUser = async (req, res , next) =>{

    const userId = req.user.id;

    try{
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data: user
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message: error.message
        })
    }
};

const logout = (req,res)=> {

   
    try {
        
        res.cookie('token' , "" ,{maxAge:0})
        res.status(200).json({
            success:true,
            message:"user logout"
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

const sendOTP = async (req , res) =>{

    const {email} = req.body;

    try {
        const user = await userModel.findOne({email})
        
        if (email !== user.email) {
             res.status(400).json({
                success:false,
                message:'please provide valid email'
        })
    }
    } catch (e) {
        res.json({
            message:e.message
        })
    }

    
        const otp = crypto.randomInt(100000 , 999999).toString()
        otps[email] = otp


        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ozella98@ethereal.email',
                pass: 'EcecY4ZZHQbvCx8JsB'
            }
        });

        const mailOptions = {
            from: 'ozella98@ethereal.email',
            to : email,
            subject: 'verify your email',
            text: `your otp code is ${otp}`
        }
    try {
        await transporter.sendMail(mailOptions)
        res.status(200).json({
            success:true,
            message:'otp send'
        })
    } catch (e) {
        res.status(500).json({
            success:false,
            message:e.message
        })
    }

}

const checkOTP = async (req,res) =>{

    const {email , otp} = req.body


    if (!email||!otp) {
        res.status(400).json({
            success:false,
            message:'please input otp'
        }
    )}

        if (otps[email] === otp) {
            delete otps[email]
            res.status(200).json({
                success:true,
                message:"OTP validate"
            })
        }else{
            res.json({
                message:'please provide valida otp'
            })
        }
}

const forgetPassword = async (req,res)=>{

    const {email , password , confirmPassword} = req.body;

        if (!email || !password ||!confirmPassword) {
            res.status(400).json({
                success:false,
                message:'please provide valid'
            })
        }
        if (password !== confirmPassword) {
            res.status(400).json({
                success:false,
                message:'password and confirm password are not same!'
            })
        }
        
        try {            
            const user = await userModel.findOne({email}).select("+password")
            
            user.password = password;
            
            await user.save()

            res.status(200).json({
                success:true,
                message:'your password changed'
            })

            
        } catch (e) {
            res.status(400).json({
                success:false,
                message:e.message
            })
        }
}

module.exports = {
    signUp,
    signIn,
    getUser,
    logout,
    sendOTP,
    checkOTP,
    forgetPassword
}