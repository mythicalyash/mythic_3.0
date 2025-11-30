import { NextResponse } from "next/server"

export const ApiResponse = (statusCode: number, message: string, data: any = []) => {
    return NextResponse.json({
        success: true,
        message,
        status: statusCode,
        data
    }, { status: statusCode})
};