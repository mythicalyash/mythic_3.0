import { NextRequest, NextResponse } from "next/server"
import PDFParser from "pdf2json"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        const parser = new PDFParser(null, true) // true for text content

        const text = await new Promise<string>((resolve, reject) => {
            parser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError))
            parser.on("pdfParser_dataReady", () => {
                resolve(parser.getRawTextContent())
            })
            parser.parseBuffer(buffer)
        })

        return NextResponse.json({ text })
    } catch (error) {
        console.error("Error parsing PDF:", error)
        return NextResponse.json(
            { error: "Failed to parse PDF" },
            { status: 500 }
        )
    }
}
