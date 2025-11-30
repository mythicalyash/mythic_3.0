import connectDB from "@/db/connectDB";
connectDB();

import User from "@/models/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { collegeId } = await req.json();

        if (!collegeId) {
            return ApiError(400, "College ID is required");
        }

        const students = await User.find({ college: collegeId }).select("-password");

        return ApiResponse(200, "Students fetched successfully", students);
    } catch (error: any) {
        return ApiError(500, error.message || "Internal Server Error");
    }
}