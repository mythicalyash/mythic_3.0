import mongoose from "mongoose";

export interface AnnouncementSchema {
    title: string;
    description: string;
    type: string;
    college: mongoose.Schema.Types.ObjectId;
}

const announcementSchema = new mongoose.Schema<AnnouncementSchema>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["new", "warning", "info"],
            default: "info"
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "colleges",
            required: true
        },
    },
    {
        timestamps: true
    }
);

const Announcement = mongoose.models.announcements || mongoose.model("announcements", announcementSchema);

export default Announcement;
