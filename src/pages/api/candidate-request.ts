import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// import UserSession from "models/UserSession";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { storeCandidateRequest } from "@/lib/userSessionCRUD";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		res.status(401).json({
			message: "User is not authenticated",
		});
	}

	if (req.method === "GET") {
		try {
			const candidateRequest = await prisma.candidateRequest.findFirst({
				where: {
					refId: req.query.requestId as string,
				},
				include: {
					candidateTuning: true,
				},
			});

			const keySkills = await prisma.skill.findMany({
				where: {
					id: {
						in: candidateRequest?.keySkills.map((skillId) => parseInt(skillId)),
					},
				},
			});

			const optionalSkills = await prisma.skill.findMany({
				where: {
					id: {
						in: candidateRequest?.optionalSkills.map((skillId) => parseInt(skillId)),
					},
				},
			});

			const locations = await prisma.location.findMany({
				where: {
					id: {
						in: candidateRequest?.jobLocation.map((locationId) => parseInt(locationId)),
					},
				},
			});

			if (!candidateRequest) {
				res.status(404).json({
					message: "User not found",
				});
				return;
			}

			res.status(200).json({ ...candidateRequest, keySkills, optionalSkills, locations });
			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
