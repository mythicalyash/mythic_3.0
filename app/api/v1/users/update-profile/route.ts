import connectDB from "@/db/connectDB";
connectDB();

import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        
    } catch (error) {
        return ApiError(500, "Error while updating user profile");
    }
}

// Do it later