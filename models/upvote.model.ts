import mongoose from 'mongoose';

export interface UpvoteSchema {
    userId: mongoose.Schema.Types.ObjectId;
    questionId?: mongoose.Schema.Types.ObjectId;
    commentId?: mongoose.Schema.Types.ObjectId;
}

const upvoteSchema = new mongoose.Schema<UpvoteSchema>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "questions", required: false },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: "comments", required: false }
});

const Upvote = mongoose.models.upvotes || mongoose.model("upvotes", upvoteSchema);

export default Upvote;