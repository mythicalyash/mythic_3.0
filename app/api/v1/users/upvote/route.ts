import connectDB from "@/db/connectDB";
connectDB();

import mongoose from "mongoose";
import { NextRequest } from "next/server";
import Upvote from "@/models/upvote.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import Downvote from "@/models/downvote.model";

export const POST = async (req: NextRequest) => {
    const { userId, questionId, commentId } = await req.json();
    
    if(!userId || (!questionId && !commentId)){
        return ApiError(400, "All fields are required");
    }
    
    if(questionId){
        const upvote = await Upvote.create({
            userId: new mongoose.Types.ObjectId(userId),
            questionId: new mongoose.Types.ObjectId(questionId)
        });

        const createdUpvote = await Upvote.findById(upvote._id);

        if(!createdUpvote){
            return ApiError(500, "Error while upvote question");
        }

        await Downvote.findOneAndDelete({
            userId: new mongoose.Types.ObjectId(userId),
            questionId: new mongoose.Types.ObjectId(questionId)
        });

        return ApiResponse(201, "Question upvoted successfully", createdUpvote);
    } else {
        const upvote = await Upvote.create({
            userId: new mongoose.Types.ObjectId(userId),
            commentId: new mongoose.Types.ObjectId(commentId)
        });

        const createdUpvote = await Upvote.findById(upvote._id);

        if(!createdUpvote){
            return ApiError(500, "Error while upvote comment");
        }

        await Downvote.findOneAndDelete({
            userId: new mongoose.Types.ObjectId(userId),
            commentId: new mongoose.Types.ObjectId(commentId)
        });

        return ApiResponse(201, "Comment upvoted successfully", createdUpvote);
    }
}