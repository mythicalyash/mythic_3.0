import connectDB from "@/db/connectDB";
connectDB();

import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import redisClient from "@/lib/redis";

export const POST = async (req: NextRequest) => {

    const {token}: {token: string} = await req.json();

    if(!token){
        return ApiError(400, "Bad request");
    }

    const userData = await redisClient.hGetAll(`users:signup:${token}`);
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

    await redisClient.del(`users:signup:${token}`);

    return ApiResponse(201, "User created successfully", createdUser);
}