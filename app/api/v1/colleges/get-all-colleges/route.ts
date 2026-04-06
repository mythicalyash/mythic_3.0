import connectDB from "@/db/connectDB";
import College from "@/models/college.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";

export const GET = async () => {
    try {
        await connectDB();
        const colleges = await College.find({}).select("-acceptingStudents");

        if (colleges.length === 0) {
            return ApiError(404, "No colleges found");
        }

        return ApiResponse(200, "Colleges fetched successfully", colleges);
    } catch (err: any) {
        console.error("Colleges fetch error:", err);
        return ApiError(500, "Internal Server Error: " + err.message);
    }
}