// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

	if (req.method === "POST") {
		try {
			const body: CandidateMatchingRequestBody = req.body;
			const request = await prisma.candidateRequest.findFirstOrThrow({
				where: {
					refId: body.requestId,
				},
			});

			const { keySkills } = request;
			const keysSkillSearch = keySkills.map((skill) => skill.toLowerCase().split(" ").join("-"));
			const selectedCandidates = await prisma.candidate.findMany({
				take: 15,
				include: {
					desiredLocations: true,
					jobPool: true,
					location: true,
					skills: true,
				},
			});

			res.status(200).json({ success: true, result_count: selectedCandidates.length, data: selectedCandidates });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
