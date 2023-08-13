import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getMatchingCandidates = async (requestId: string) => {
	const request = await prisma.candidateRequest.findFirstOrThrow({
		where: {
			refId: requestId,
		},
		include: {
			candidateTuning: true,
		},
	});

	const {
		keySkills,
		jobLocation,
		minExperience,
		maxExperience,
		candidateTuning,
		optionalSkills,
		minSalary,
		maxSalary,
		expectedJoiningDate,
	} = request as unknown as CandidateRequestWithRelation;

	const keySkillsId = keySkills.map((skill) => parseInt(skill));
	const desiredLocationId = jobLocation.map((location) => parseInt(location));

	if (!candidateTuning) throw new Error("Candidate tuning is not available");

	const { skillWeight, experienceWeight, salaryWeight, locationWeight, noticePeriodWeight } = candidateTuning[0];

	let candidateFilter: Prisma.CandidateWhereInput = {};
	let candidateANDFilters = [];

	if (skillWeight > 50) {
		// console.log(" -- filter for skill -- ");
		const skillFilter: Prisma.CandidateWhereInput = {
			skills: {
				some: {
					skillId: {
						in: keySkillsId,
					},
				},
			},
		};
		candidateFilter = { ...candidateFilter, ...skillFilter };
	}

	if (experienceWeight > 50) {
		// console.log(" -- filter for experience -- ");
		const experienceFilter: Prisma.CandidateWhereInput = {
			totalExperience: {
				gt: minExperience,
				lte: maxExperience,
			},
		};

		candidateANDFilters.push(experienceFilter);
	}

	if (noticePeriodWeight > 50) {
		// console.log(" -- filter for notice period -- ");
		const noticePeriodFilter = {
			noticePeriod: {
				gte: 0,
				lte: 1,
			},
		};
		candidateANDFilters.push(noticePeriodFilter);
	}

	if (salaryWeight > 50) {
		// console.log(" -- filter for salary -- ");
		const salaryFilter: Prisma.CandidateWhereInput = {
			expectedSalary: {
				gte: minSalary <= 0 ? minSalary : minSalary * 100000,
				lte: maxSalary * 100000,
			},
		};
		// candidateFilter = { ...candidateFilter, ...salaryFilter };
		candidateANDFilters.push(salaryFilter);
	}

	if (locationWeight > 50) {
		// console.log(" -- filter for location -- ");
		const locationFilter: Prisma.CandidateWhereInput = {
			desiredLocations: {
				some: {
					locationId: {
						in: desiredLocationId,
					},
				},
			},
		};
		// candidateFilter = { ...candidateFilter, ...locationFilter };
		candidateANDFilters.push(locationFilter);
	}

	candidateFilter = { ...candidateFilter, AND: candidateANDFilters };

	console.log("Constructed filter", JSON.stringify(candidateFilter));

	const selectedCandidates = await prisma.candidate.findMany({
		take: 15,
		where: candidateFilter,
		include: {
			desiredLocations: {
				include: {
					location: true,
				},
			},
			jobPool: true,
			location: true,
			skills: {
				include: {
					skill: true,
				},
			},
		},
	});

	// TODO: Calculate score for each of the weights and display on the UI
	// TODO: Skill score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Experience score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: NoticePeriod score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Salary score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%
	// TODO: Location score -> if recruiter has selected 5 skills and candidate has all 5 skills 100%

	return selectedCandidates;
};
