import mongoose from "mongoose";

export interface QuestionSchema {
    title: string;
    description: string;
    college: mongoose.Schema.Types.ObjectId;
    tags: string[];
    userId: mongoose.Schema.Types.ObjectId;
    solved: boolean;
    answer: mongoose.Schema.Types.ObjectId;
}

const questionSchema = new mongoose.Schema<QuestionSchema>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    college: { type: mongoose.Schema.Types.ObjectId, ref: "colleges", required: true },
    tags: { type: [String], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    solved: { type: Boolean, default: false },
    answer: { type: mongoose.Schema.Types.ObjectId, ref: "answers", default: null }
}, {
    timestamps: true
});

const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);

export default Question;