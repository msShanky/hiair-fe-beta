import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

// import UserSession from "models/UserSession";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAllCandidateRequest, getCandidateRequestByID } from "helpers/api";
// import { storeCandidateRequest } from "@/lib/userSessionCRUD";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session || !session?.user?.email) {
		res.status(401).json({ message: "User is not authenticated" });
	}

	if (req.method === "GET") {
		try {
			const requestId = req.query?.requestId as string;

			console.log("request id ==> ", requestId);
			if (requestId) {
				const dbRequestById = await getCandidateRequestByID(requestId);
				console.log("dbRequestById ==> ", dbRequestById);
				if (!dbRequestById) {
					res.status(404).json({ message: "User not found" });
				}

				res.status(200).json(dbRequestById);
			}

			const allUserRequest = await getAllCandidateRequest(session?.user?.email as string);

			res.status(200).json(allUserRequest);

			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
