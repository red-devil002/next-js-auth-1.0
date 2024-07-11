import { connectDB } from "@/dbConnection/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";


connectDB()

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {token} = reqBody
        console.log(token);

        //asume token returned
        const user = await User.findOne({verifyYoken: token, verifyTokenExpiry: {$gt: Date.now()}})
        
        if (!user){
            return NextResponse.json({error: "Invaild token"}, {status: 400})
        }
        console.log(user);

        //clean up process
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: "Email verified successfully", success: true}, {status: 500})
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}