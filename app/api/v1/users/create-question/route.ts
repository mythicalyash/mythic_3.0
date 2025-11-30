import connectDB from "@/db/connectDB"
connectDB();

import { NextRequest } from "next/server";
import Question from "@/models/question.model";
import { ApiError } from "@/utils/ApiError";
import mongoose from "mongoose";
import { ApiResponse } from "@/utils/ApiResponse";

export const POST = async (req: NextRequest) => {
    const { title, description, collegeId, tags, userId } = await req.json();
    
    if(!title || !description || !collegeId || !tags || !userId){
        return ApiError(400, "All fields are required");
    }
    
    const question = await Question.create({
        title,
        description,
        college: new mongoose.Types.ObjectId(collegeId),
        tags,
        userId: new mongoose.Types.ObjectId(userId)
    });
    
    const createdQuestion = await Question.findById(question._id);

    if(!createdQuestion){
        return ApiError(404, "Question not found");
    }

    return ApiResponse(201, "Question created successfully", createdQuestion);
}