import { model, models, Schema } from "mongoose";

const MODEL_NAME = "user_feedback";

// TODO: Track the timestamp on when this session was created
const UserFeedbackSchema = new Schema({
	sessionId: String,
	userId: String,
	candidateFeedback: Array,
});

// export default mongoose.models.HiairCandidate || mongoose.model("hiair_candidate", HiairCandidate);

const UserFeedbackModel = models[MODEL_NAME] || model(MODEL_NAME, UserFeedbackSchema);
export default UserFeedbackModel;
