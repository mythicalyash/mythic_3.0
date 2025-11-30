import mongoose from "mongoose";

export interface DownvoteSchema {
    userId: mongoose.Schema.Types.ObjectId;
    questionId: mongoose.Schema.Types.ObjectId;
}

const downvoteSchema = new mongoose.Schema<DownvoteSchema>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "questions", required: true }
});

const Downvote = mongoose.models.downvotes || mongoose.model("downvotes", downvoteSchema);

export default Downvote;