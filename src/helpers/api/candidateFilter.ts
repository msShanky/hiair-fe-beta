import { Prisma } from "@prisma/client";

export const filterConstruct = (request: CandidateRequestWithRelation) => {
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
	} = request;

	const keySkillsId = keySkills.map((skill) => parseInt(skill));
	const desiredLocationId = jobLocation.map((location) => parseInt(location));
	const { skillWeight, experienceWeight, salaryWeight, locationWeight, noticePeriodWeight } = candidateTuning[0];
	let candidateFilter: Prisma.CandidateWhereInput = {};
	let candidateANDFilters = [];

	if (skillWeight > 50) {
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
		const experienceFilter: Prisma.CandidateWhereInput = {
			totalExperience: {
				gt: minExperience,
				lte: maxExperience,
			},
		};

		candidateANDFilters.push(experienceFilter);
	}

	if (noticePeriodWeight > 50) {
		const noticePeriodFilter = {
			noticePeriod: {
				gte: 0,
				lte: 1,
			},
		};
		candidateANDFilters.push(noticePeriodFilter);
	}

	if (salaryWeight > 50) {
		const salaryFilter: Prisma.CandidateWhereInput = {
			expectedSalary: {
				gte: minSalary <= 0 ? minSalary : minSalary * 100000,
				lte: maxSalary * 100000,
			},
		};
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
		candidateANDFilters.push(locationFilter);
	}

	candidateFilter = { ...candidateFilter, AND: candidateANDFilters };

	return candidateFilter;
};
