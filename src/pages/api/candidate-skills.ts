// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
// import { definitions } from "../../types/supabase";
import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		try {
			const query = req.query.isTech;
			const booleanIsTech: boolean =
				typeof query === "string" ? query === "true" : Array.isArray(query) ? query[0] === "true" : false;

			const dbTechSkills = await prisma.skill.findMany({ where: { isHotTech: booleanIsTech } });

			const formattedSkillList = dbTechSkills.map((dbSkill) => {
				return {
					value: dbSkill.id.toString(),
					label: dbSkill.label,
				};
			});

			return res.status(200).json({ success: true, result_count: formattedSkillList.length, data: formattedSkillList });
		} catch (err) {
			res.status(400).json({ success: false, error: JSON.stringify(err) });
		}
	}
}
