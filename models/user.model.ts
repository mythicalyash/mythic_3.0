import mongoose, { Types } from "mongoose";

export interface UserSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bio: string;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
    accessGranted: boolean;
    dayStreak: number;
    badges: string[];
    xp: number;
    currentLevel: string;
    college: Types.ObjectId;
    avatar?: string;
}

const userSchema = new mongoose.Schema<UserSchema>(
    {
        firstName: {
            type: String,
            maxLength: 20,
            required: true
        },
        lastName: {
            type: String,
            maxLength: 20
        },
        email: {
            type: String,
            required: true,
            match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            unique: true,
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        bio: {
            type: String,
            maxLength: 150
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        accessGranted: {
            type: Boolean,
            default: false
        },
        dayStreak:{
            type: Number,
            default: 0
        },
        badges: {
            type: [String],
            default: [],
        },
        xp: {
            type: Number,
            default: 0
        },
        currentLevel: {
            type: String,
            default: "Novice"
        },
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "colleges",
            required: true
        },
        avatar: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;