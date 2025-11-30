import { NextResponse } from "next/server"

export const ApiError = (statusCode: number, message: string) => {
    return NextResponse.json({
        success: false,
        message,
        status: statusCode
    }, { status: statusCode})
};