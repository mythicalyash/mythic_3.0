import connectDB from "@/db/connectDB";
connectDB();

import mongoose from "mongoose";
import { NextRequest } from "next/server";
import Comment from "@/models/comment.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export const POST = async (req: NextRequest) => {
    const { questionId, commentContent, userId } = await req.json();
    
    if(!questionId || !commentContent || !userId){
        return ApiError(400, "All fields are required");
    }
    
    const comment = await Comment.create({
        userId: new mongoose.Types.ObjectId(userId),
        questionId: new mongoose.Types.ObjectId(questionId),
        comment: commentContent
    });

    const createdComment = await Comment.findById(comment._id);

    if(!createdComment){
        return ApiError(500, "Error while create comment");
    }

    return ApiResponse(201, "Comment created successfully", createdComment);
}