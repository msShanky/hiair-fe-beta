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

	if (req.method === "POST") {
		try {
			const user = await prisma.user.findFirst({
				where: {
					email: session?.user?.email,
				},
				include: {
					userProfile: true,
				},
			});

			if (!user) {
				res.status(404).json({
					message: "User not found",
				});
				return;
			}

			const userSession = await storeCandidateRequest(req.body, user);

			res.status(200).json({ ...userSession });
			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
