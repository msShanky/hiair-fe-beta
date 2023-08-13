// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import { getMatchingCandidates } from "helpers/api";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Fetches the candidate list for recruiters view
	if (req.method === "GET") {
		const perPage = 500;
		try {
			const { page } = req.query;
			const candidates = await prisma.candidate.findMany({
				skip: perPage > 2 ? perPage * parseInt(page as string) ?? 1 : 0,
				take: perPage,
			});
			res.status(200).json({ success: true, data: candidates });
		} catch (err) {
			res.status(400).json({ success: false, data: JSON.stringify(err) });
		}
	}

	// Manages candidate request and the business logic
	if (req.method === "POST") {
		try {
			const body: CandidateMatchingRequestBody = req.body;
			const matchingCandidates = await getMatchingCandidates(body.requestId);
			res.status(200).json({ success: true, result_count: matchingCandidates.length, data: matchingCandidates });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
