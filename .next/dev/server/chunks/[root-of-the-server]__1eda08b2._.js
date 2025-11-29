module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/ai-config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "aiConfig",
    ()=>aiConfig
]);
const aiConfig = {
    "ai-writer": {
        systemPrompt: `You are an expert AI Writer. Your goal is to generate high-quality, engaging, and well-structured content based on the user's request. 
    - If the user asks for a blog post, include a catchy title, introduction, body paragraphs with headings, and a conclusion.
    - If the user asks for an article, ensure it is informative and objective.
    - If the user asks for creative writing, be imaginative and descriptive.
    - Always maintain a professional yet conversational tone unless specified otherwise.
    - Format the output using Markdown.`,
        model: "gemini-2.5-pro",
        temperature: 0.7
    },
    "code-assistant": {
        systemPrompt: `You are an expert AI Code Assistant. Your goal is to help users write, debug, and optimize code.
    - Provide clean, efficient, and well-commented code.
    - Explain your logic and the changes you make.
    - If the user asks for a specific language or framework, adhere to its best practices.
    - If debugging, identify the error and provide a corrected version.
    - Format code blocks using Markdown with language syntax highlighting (e.g., \`\`\`python ... \`\`\`).`,
        model: "gemini-2.5-pro",
        temperature: 0.2
    },
    "document-analyzer": {
        systemPrompt: `You are an expert Document Analyzer. Your goal is to extract insights, summarize, and analyze text provided by the user.
    - If asked to summarize, provide a concise overview of the main points.
    - If asked to extract key points, list them clearly.
    - If asked to analyze sentiment, determine the overall tone (positive, negative, neutral) and provide evidence.
    - Format the output using Markdown.`,
        model: "gemini-2.5-pro",
        temperature: 0.3
    },
    "ai-assistant": {
        systemPrompt: `You are a helpful and versatile AI Assistant. Your goal is to assist the user with a wide range of tasks, from research to daily activities.
    - Be polite, professional, and concise.
    - If the user asks a question, provide a direct and accurate answer.
    - If the user asks for ideas, provide a creative list.
    - If the user asks for a draft (e.g., email), provide a well-structured template.
    - Format the output using Markdown where appropriate.`,
        model: "gemini-2.5-pro",
        temperature: 0.7
    }
};
}),
"[project]/app/api/gemini/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@google/generative-ai/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ai-config.ts [app-route] (ecmascript)");
;
;
;
async function POST(req) {
    try {
        const { tool, prompt } = await req.json();
        if (!tool || !prompt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing tool or prompt"
            }, {
                status: 400
            });
        }
        const config = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ai$2d$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["aiConfig"][tool];
        if (!config) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid tool selected"
            }, {
                status: 400
            });
        }
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "GEMINI_API_KEY is not set in environment variables"
            }, {
                status: 500
            });
        }
        const genAI = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$google$2f$generative$2d$ai$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GoogleGenerativeAI"](apiKey);
        const model = genAI.getGenerativeModel({
            model: config.model
        });
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [
                        {
                            text: config.systemPrompt
                        }
                    ]
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Understood. I am ready to assist you as per your instructions."
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: config.temperature || 0.7
            }
        });
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            result: text
        });
    } catch (error) {
        console.error("Error generating content:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to generate content";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: errorMessage
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1eda08b2._.js.map