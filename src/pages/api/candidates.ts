// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			res.status(200).json({ success: true, data: [] });
		} catch (err) {
			res.status(400).json({ success: false, data: JSON.stringify(err) });
		}
	}

	if (req.method === "POST") {
		try {
			const body: CandidateRequestCreationPostBody = req.body;
			const experienceRange = body.experience?.split("-");
			const andConditions = [];

			if (experienceRange) {
				const [min, max] = experienceRange;
				andConditions.push({ total_experience: { $lt: max } });
				andConditions.push({ total_experience: { $gt: min } });
			}

			if (body.salary_range) {
				const [min, max] = body.salary_range;
				andConditions.push({ current_ctc: { $lt: max } });
				andConditions.push({ current_ctc: { $gt: min } });
			}
			res.status(200).json({ success: true, result_count: 0, data: [] });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
