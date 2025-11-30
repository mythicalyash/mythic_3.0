import connectDB from "@/db/connectDB";
connectDB();

import mongoose from "mongoose";
import { NextRequest } from "next/server";
import Question from "@/models/question.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export const POST = async (req: NextRequest) => {
    const { questionId, answerCommentId } = await req.json();
    
    if(!questionId || !answerCommentId){
        return ApiError(400, "Question ID and answer comment ID are required");
    }
    
    const question = await Question.findById(questionId);
    
    if(!question){
        return ApiError(404, "Question not found");
    }
    
    question.solved = true;
    question.answer = new mongoose.Types.ObjectId(answerCommentId);
    await question.save();
    
    return ApiResponse(200, "Question closed successfully", question);
}