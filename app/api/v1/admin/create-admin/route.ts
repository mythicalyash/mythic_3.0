import connectDB from "@/db/connectDB";
connectDB();

import Admin from "@/models/admin.model";
import { ApiError } from "@/utils/ApiError";
import { NextRequest } from "next/server";
import bcrypt from 'bcrypt';
import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
    const {firstName, lastName, email, password, collegeId, adminId} : {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        collegeId: string;
        adminId: string;
    } = await req.json();

    if(!firstName || !email || !password || !collegeId || !adminId){
        return ApiError(400, "Bad request");
    }

    const currAdmin = await Admin.findById(adminId);
    if(!currAdmin){
        return ApiError(401, "Unauthorized request");
    }

    const existingAdmin = await Admin.findOne({
        email
    });
    if(existingAdmin){
        return ApiError(409, "Admin with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        college: new mongoose.Types.ObjectId(collegeId)
    });

    const createdAdmin = await Admin.findById(admin?.id).select('-password');
    if(!createdAdmin){
        return ApiError(500, "Error while creating admin document");
    }

    return ApiResponse(201, "Admin created successfully", createdAdmin);
}