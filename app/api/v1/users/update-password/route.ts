import connectDB from "@/db/connectDB";
connectDB();

import { ApiError } from "@/utils/ApiError";
import User from "@/models/user.model";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
    try {
        const { prevPassword, newPassword, userId } = await req.json();

        const user = await User.findById(userId);
        if (!user) {
            return ApiError(404, "User not found");
        }
        
        const isPasswordMatch = await bcrypt.compare(prevPassword, user.password);
        if (!isPasswordMatch) {
            return ApiError(400, "Invalid password");
        }
        
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return ApiResponse(200, "Password updated successfully");
    } catch (error: any) {
        return ApiError(500, error.message || "Internal Server Error");
    }
}