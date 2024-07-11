import { connectDB } from "@/dbConnection/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connectDB()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json()
        const {email, password} = reqBody

        //validation
        console.log(reqBody);
        const user = await User.findOne({email})

        if (!user){
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }
        console.log("User Exists");
        
        //checking credentials
        const vaildPassword = await bcryptjs.compare(password, user.password)

        if(!vaildPassword) {
            return NextResponse.json({error: "Check your Credentials"}, {status: 400})
        }

        //password ok
        // creating jwt
        // creating data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        
        // creating token using the uper data
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const respone = NextResponse.json({
            message: "Logged in success",
            success: true
        })
        
        //cookies
        respone.cookies.set("token", token, {
            httpOnly: true
        })
        return respone


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}