import connectDB from "@/db/connectDB";
import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { getRedisClient } from "@/lib/redis";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const redis = await getRedisClient();

    const {token}: {token: string} = await req.json();

        if(!token){
            return ApiError(400, "Bad request");
        }

        const userData = await redis.hGetAll(`users:signup:${token}`);
        if(Object.keys(userData).length == 0){
            return ApiError(401, "Invalid token");
        }

        const user = await User.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password,
            email: userData.email,
            college: new mongoose.Types.ObjectId(userData.collegeId)
        });

        const createdUser = await User.findById(user?.id).select('-password');
        if(!createdUser){
            return ApiError(500, "Error while creating user document");
        }

        await redis.del(`users:signup:${token}`);

        return ApiResponse(201, "User created successfully", createdUser);
    } catch(err: any) {
        console.error("Verify email error:", err);
        return ApiError(500, "Internal Server Error: " + err.message);
    }
}