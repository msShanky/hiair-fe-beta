// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await getServerSession(req, res, authOptions);

	if (!session) {
		return res.status(401).json({ message: "Invalid session, user un-authorised" });
	}

	if (req.method === "POST") {
		const postBody = req.body;

		try {
			const user = await prisma.user.findFirstOrThrow({
				where: {
					email: session?.user?.email,
				},
			});

			const existingProfile = await prisma.userProfile.findFirst({
				where: {
					userId: user.id,
				},
			});

			if (existingProfile) {
				const updatedProfile = await prisma.userProfile.update({
					where: {
						id: existingProfile.id,
					},
					data: {
						userId: user.id,
						userType: postBody.type === "recruiter" ? "RECRUITER" : "CANDIDATE",
					},
				});
				return res.status(200).json({ success: true, message: "Updated the user profile", profile: updatedProfile });
			} else {
				const profile = await prisma.userProfile.create({
					data: {
						userId: user.id,
						userType: postBody.type === "recruiter" ? "RECRUITER" : "CANDIDATE",
					},
				});
				return res
					.status(201)
					.json({ success: true, message: "User profile is created and new type is assigned", profile });
			}

			// res.status(201).json({ success: true, result_count: userSession.length, data: userSession });
		} catch (err) {
			res.status(400).json({ success: false, error: err });
		}
	}
}
