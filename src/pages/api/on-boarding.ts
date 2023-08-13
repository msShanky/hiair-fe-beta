// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			// const onboarding = await OnBoarding.find({});
			res.status(200).json({ success: true, data: {} });
		} catch (err) {
			res.status(400).json({ success: false, data: JSON.stringify(err) });
		}
	}

	if (req.method === "POST") {
		try {
			// const onBoardingResponse = await OnBoarding.create(req.body);
			res.status(201).json({ success: true, data: {} });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
