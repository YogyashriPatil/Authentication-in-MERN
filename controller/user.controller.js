import User from "../model/User.model.js"
import crypto from "crypto"
import nodemailer from "nodemailer"
const registerUSer= async (req,res) => {
    
    //get user data
    const { name, email, password } = req.body;
    
    //validate
    if(!name || !email || !password ){
        return res.status(400).json({
            message:"All fields are required"
        });
    }

    // console.log(email);

    //check if user aready exists
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message:"User already exists"
            })
        }

        //create a user in database

        const user = await User.create({
            name,
            email,
            password
        })
        console.log(user);
        if(!user){
            return res.status(400).json({
                message:"User not registered"
            })
        }

        //create a verification token
        const token = crypto.randomBytes(32).toString("hex")
        console.log(token);

        //save token in DB
        user.verificationToken=token
        await user.save()

        //send token as email to user
        const transporter= nodemailer.createTransport({
            host:process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            secure: false, //true for port 465, false for other
            auth: {
                user:process.env.MAILTRAP_USERNAME,
                pass:process.env.MAILTRAP_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.MAILTRAP_SENDEREMAIL, //sender address
            to: user.email ,//list of receives
            subject:"Verify your email", //subject line
            text :`Please click on the following link : 
                ${process.env.BASE_URL}/api/v1/users/verify/${token}
            `, //plain text body
            // html:"", //html body
        }

        await transporter.sendMail(mailOption)

        res.status(201).json({
            message:"User registred sucessfully",
            success:true,
        })

    } catch (error) {
        
    }
    

    //send success status to user
    
};


const login= async (req,res) => {
    res.send("Login")
};

export {registerUSer};