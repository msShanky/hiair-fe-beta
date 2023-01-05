import { model, models, Schema } from "mongoose";

const MODEL_NAME = "hiair_candidate";

const HiairCandidateSchema = new Schema({
	first_name: String,
	last_name: String,
	full_name: String,
	occupation: String,
	headline: String,
	summary: String,
	experiences: Array,
	education: Array,
	industry: String,
	skills: Array,
	city: String,
	state: String,
	country: String,
	total_experience: Number,
	notice_period: Number,
	current_ctc: Number,
});

// export default mongoose.models.HiairCandidate || mongoose.model("hiair_candidate", HiairCandidate);

const HiairCandidateModel = models[MODEL_NAME] || model(MODEL_NAME, HiairCandidateSchema);
export default HiairCandidateModel;
