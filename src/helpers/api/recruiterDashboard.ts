import prisma from "@/lib/prisma";

const getTopSkills = async (count: number, skillList: Array<any>) => {
	const shortListedList = skillList.splice(0, count);
	const dataPromiseHolder: Array<Promise<any>> = shortListedList.map((skillCountItem) => {
		return prisma.skill.findFirst({
			where: {
				id: skillCountItem.skillId,
			},
		});
	});

	const response = await Promise.all(dataPromiseHolder);

	const skillInsights = response.map((skill) => {
		const skillCount = shortListedList.filter((skillCount) => skillCount.skillId === skill.id)[0];
		return { ...skill, count: skillCount._count.skillId ?? 0 };
	});

	return skillInsights;
};

const getTopLocations = async (count: number, locationList: Array<any>) => {
	const shortListedList = locationList.splice(0, count);
	const dataPromiseHolder: Array<Promise<any>> = shortListedList.map((locationCountItem) => {
		return prisma.location.findFirst({
			where: {
				id: locationCountItem.locationId,
			},
		});
	});

	const response = await Promise.all(dataPromiseHolder);

	const locationInsights = response.map((location) => {
		const locationCount = shortListedList.filter((locationCount) => locationCount.locationId === location.id)[0];
		return { ...location, count: locationCount._count.locationId ?? 0 };
	});

	return locationInsights;
};

export const getDashboardJobPool = async () => {
	const candidateAgg = await prisma.candidate.count();

	const locationResponse = await prisma.candidate.findMany({ distinct: ["locationId"] });

	const uniqueSkillResponse = await prisma.candidateSkillMapping.groupBy({ by: ["skillId"] });

	const topSkillsCount = await prisma.candidateSkillMapping.groupBy({
		by: ["skillId"],
		_count: {
			skillId: true,
		},
		orderBy: {
			_count: {
				skillId: "desc",
			},
		},
	});

	// TODO: Use topSkillsCount to get the top 20 skills and include the skill information and add the count

	const topLocationCount = await prisma.candidateDesiredLocationMapping.groupBy({
		by: ["locationId"],
		_count: {
			locationId: true,
		},
		orderBy: {
			_count: {
				locationId: "desc",
			},
		},
	});

	const desiredLocationResponse = await prisma.candidateDesiredLocationMapping.groupBy({ by: ["locationId"] });
	const titleDistinctResponse = await prisma.candidate.findMany({ distinct: ["jobTitle"] });

	const totalTechSkills = await prisma.skill.count({
		where: {
			isHotTech: true,
		},
	});

	const totalNonTechSkills = await prisma.skill.count({
		where: {
			isHotTech: false,
		},
	});

	const totalLocations = await prisma.location.count();

	const topSkills = await getTopSkills(5, topSkillsCount);
	const topLocations = await getTopLocations(15, topLocationCount);

	return {
		candidateCount: candidateAgg,
		candidateSkillCount: uniqueSkillResponse.length,
		candidateLocationCount: locationResponse.length,
		desiredLocationCount: desiredLocationResponse.length,
		candidateTitleCount: titleDistinctResponse.length,
		totalTechSkills,
		totalNonTechSkills,
		totalLocations,
		topSkills,
		topLocations,
	};
};
