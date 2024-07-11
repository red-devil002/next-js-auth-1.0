import { connectDB } from "@/dbConnection/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken.helper";

connectDB()

export async function POST(req: NextRequest) {
    // extract data from token (good practies is to make utility)
    const userId = await getDataFromToken(req)
    const user = await User.findOne({_id: userId}).select("-password -username")

    //check if ther is no user
    return NextResponse.json({
        message: "User Found",
        data: user
    })
}