import mongoose from "mongoose";

export interface CollegeSchema {
    name: string;
    acceptingStudents: boolean;
}

const collegeSchema = new mongoose.Schema<CollegeSchema>(
    {
        name: {
            type: String,
            required: true
        },
        acceptingStudents: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const College = mongoose.models.colleges || mongoose.model("colleges", collegeSchema);

export default College;