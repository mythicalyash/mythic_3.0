import connectDB from "@/db/connectDB";
connectDB();

import mongoose from "mongoose";
import { NextRequest } from "next/server";
import Downvote from "@/models/downvote.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import Upvote from "@/models/upvote.model";

export const POST = async (req: NextRequest) => {
    const { userId, questionId, commentId } = await req.json();
    
    if(!userId || (!questionId && !commentId)){
        return ApiError(400, "All fields are required");
    }
    
    if(questionId){
        const downvote = await Downvote.create({
            userId: new mongoose.Types.ObjectId(userId),
            questionId: new mongoose.Types.ObjectId(questionId)
        });

        const createdDownvote = await Downvote.findById(downvote._id);

        if(!createdDownvote){
            return ApiError(500, "Error while downvoting question");
        }

        await Upvote.findOneAndDelete({
            userId: new mongoose.Types.ObjectId(userId),
            questionId: new mongoose.Types.ObjectId(questionId)
        });

        return ApiResponse(201, "Question downvoted successfully", createdDownvote);
    } else {
        const downvote = await Downvote.create({
            userId: new mongoose.Types.ObjectId(userId),
            commentId: new mongoose.Types.ObjectId(commentId)
        });

        const createdDownvote = await Downvote.findById(downvote._id);

        if(!createdDownvote){
            return ApiError(500, "Error while downvoting comment");
        }

        await Upvote.findOneAndDelete({
            userId: new mongoose.Types.ObjectId(userId),
            commentId: new mongoose.Types.ObjectId(commentId)
        });

        return ApiResponse(201, "Comment downvoted successfully", createdDownvote);
    }
}