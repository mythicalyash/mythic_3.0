import connectDB from "@/db/connectDB";
connectDB();

import Announcement from "@/models/announcement.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const collegeId = req.nextUrl.searchParams.get("collegeId");

        // Validate collegeId parameter
        if (!collegeId) {
            return ApiError(400, "College ID is required");
        }

        // Fetch announcements sorted by newest first
        const announcements = await Announcement.find({ college: collegeId })
            .sort({ createdAt: -1 });

        // Transform the data to match component interface
        const transformedAnnouncements = announcements.map((announcement: any) => ({
            id: announcement._id.toString(),
            title: announcement.title,
            content: announcement.description, // Map description to content
            type: announcement.type,
            date: new Date(announcement.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        }));

        return ApiResponse(200, "Announcements fetched successfully", transformedAnnouncements);
    } catch (error) {
        console.error("Failed to fetch announcements", error);
        return ApiError(500, "Failed to fetch announcements");
    }
}