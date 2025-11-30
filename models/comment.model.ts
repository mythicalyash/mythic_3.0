import mongoose from "mongoose";

export interface CommentSchema {
    userId: mongoose.Schema.Types.ObjectId;
    questionId: mongoose.Schema.Types.ObjectId;
    comment: string;
}

const commentSchema = new mongoose.Schema<CommentSchema>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "questions", required: true },
    comment: { type: String, required: true }
});

const Comment = mongoose.models.comments || mongoose.model("comments", commentSchema);

export default Comment;