import connectDB from "@/db/connectDB";
import Admin from "@/models/admin.model";
connectDB();

import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendMail } from "@/utils/mailer";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    const {adminUserId, studentUserId, accept} : {
        adminUserId: string,
        studentUserId: string,
        accept: boolean
    } = await req.json();

    if(!studentUserId || !adminUserId) {
        return ApiError(400, "Bad request");
    }

    const admin = await Admin.findById(adminUserId);
    if(!admin){
        return ApiError(401, "Unauthorized request");
    }

    const user = await User.findById(studentUserId);
    if(!user){
        return ApiError(401, "Invalid userId");
    }

    if(accept){
        user.accessGranted = true;
        await user.save();
    } else {
        await User.deleteOne({ _id: studentUserId});
        await sendMail(user.email, "delete");
    }

    return ApiResponse(200, `Access ${accept ? "granted" : "denied"} successfully`);
}