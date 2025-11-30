import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath:string) => {
    try {
        const response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        console.log('Error while uploading file to cloudinary: ', error);
    }
};

export const deleteFromCloudinary = async (publicIds: Array<string>) => {
    try {
        await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
        console.log("Error while deleting files from cloudinary: ", error);
    }
}