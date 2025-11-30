import mongoose, { Types } from "mongoose";

export interface AdminSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    college: Types.ObjectId;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date;
}

const adminSchema = new mongoose.Schema<AdminSchema>(
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
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'colleges'
        }
    },
    {
        timestamps: true
    }
);

const Admin = mongoose.models.admins || mongoose.model("admins", adminSchema);

export default Admin;