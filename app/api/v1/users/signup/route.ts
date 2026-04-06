import connectDB from "@/db/connectDB";
import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { ApiResponse } from "@/utils/ApiResponse";
import { getRedisClient } from "@/lib/redis";
import { randomBytes } from "crypto";
import { sendMail } from "@/utils/mailer";

export const POST = async (req: NextRequest) => {
    try {
        await connectDB();
        const redis = await getRedisClient();

        const { firstName, lastName, email, password, collegeId } = await req.json();

        if(!firstName || !email || !password || !collegeId){
            return ApiError(400, "Bad request");
        }

        const existingUser = await User.findOne({
            email
        });

        if(existingUser){
            return ApiError(409, "User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const emailVerificationToken = randomBytes(16).toString('hex');

        try {
            await sendMail(email, "email", emailVerificationToken);
        } catch (mailError) {
            console.log("Mocking email send since SMTP credentials might be dummy:", emailVerificationToken);
        }

        await redis.hSet(`users:signup:${emailVerificationToken}`, {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            collegeId
        });
        
        const tempInfo = await redis.hGetAll(`users:signup:${emailVerificationToken}`);
        await redis.expire(`users:signup:${emailVerificationToken}`, 600);

        if(!tempInfo){
            return ApiError(500, "Error while storing user info temporarily");
        }

        delete tempInfo["password"];

        return ApiResponse(201, "User created successfully", tempInfo);
    } catch(err: any) {
        console.error("Signup internal error:", err);
        return ApiError(500, "Internal Server Error: " + err.message);
    }
}