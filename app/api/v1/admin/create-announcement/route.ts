import connectDB from "@/db/connectDB";
connectDB();

import Announcement from "@/models/announcement.model";
import { ApiError } from "@/utils/ApiError";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {
    try {
        const { title, description, collegeId, type } = await req.json();

        if(!title || !description || !collegeId || !type){
            return ApiError(400, "All fields are required");
        }

        const announcement = await Announcement.create({
            title,
            description,
            college: new mongoose.Types.ObjectId(collegeId),
            type
        })

        const createdAnnouncement = await Announcement.findById(announcement._id);
        if(!createdAnnouncement){
            return ApiError(500, "Error while creating announcement");
        }

        return ApiResponse(201, "Announcement created successfully", createdAnnouncement);
    } catch (error) {
        return ApiError(500, "Error while creating announcement: " + error);
    }
}