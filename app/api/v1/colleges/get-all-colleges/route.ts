import connectDB from "@/db/connectDB";
connectDB();

import College from "@/models/college.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export const GET = async () => {
    const colleges = await College.find({}).select("-acceptingStudents") || {};

    if(colleges.length == 0){
        return ApiError(500, "Error while fetching colleges");
    }

    return ApiResponse(200, "Colleges fetched successfully", colleges);
}