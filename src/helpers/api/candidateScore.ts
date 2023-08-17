import { CandidateDesiredLocationMapping, Location } from "@prisma/client";

export const getCandidateExperienceScore = (experience: number, requestExp: Array<number>): number => {
	const idealExperience = requestExp[1]; // Ideal experience is the maximum value of the range
	const minExperience = requestExp[0]; // Minimum experience value from the range

	const normalizedExperience = (experience - minExperience) / (idealExperience - minExperience);
	let experienceMatch = 0;

	if (normalizedExperience > 1) {
		experienceMatch = normalizedExperience * 10;
	} else {
		experienceMatch = normalizedExperience * 100;
	}

	return parseFloat(experienceMatch.toFixed(2));
};

export const getCandidateSkillScore = (skills: Array<SkillMapping>, keySkills: Array<String>): number => {
	const requestSkills = keySkills;
	let candidateSkillMatchScore = 0;

	skills.forEach((skill) => {
		const isSkillMatch = requestSkills.includes(skill.skillId.toString());
		if (isSkillMatch) {
			candidateSkillMatchScore += 1;
		}
	});

	return (candidateSkillMatchScore / keySkills.length) * 100;
};

export const getCandidateLocationScore = async (
	location: Location,
	desiredLocations: Array<DesiredLocationMapping>,
	requestLocation: Array<string>
): Promise<number> => {
	let locationScore = 0;

	const locationMapping = await prisma.location.findMany({
		where: {
			id: {
				in: requestLocation.map((locationId) => parseInt(locationId, 10)),
			},
		},
	});

	desiredLocations.forEach((locationItem) => {
		const { location } = locationItem;
		const isPartialMatch = locationMapping.some((mapLocation) => {
			const isStateMatch = mapLocation.stateValue === location.stateValue;
			const isCityMatch = mapLocation.cityValue === location.cityValue;
			return isStateMatch || isCityMatch;
		});

		const isWholeMatch = locationMapping.some((mapLocation) => {
			const isStateMatch = mapLocation.stateValue === location.stateValue;
			const isCityMatch = mapLocation.cityValue === location.cityValue;
			return isStateMatch && isCityMatch;
		});

		if (isWholeMatch) {
			locationScore += 1;
		}

		if (isPartialMatch) {
			locationScore += 0.5;
		}
	});

	// const isStateMatch = location.stateValue === location.stateValue;
	const locationPartialMatch = locationMapping.some((mapLocation) => {
		const isStateMatch = mapLocation.stateValue === location.stateValue;
		const isCityMatch = mapLocation.cityValue === location.cityValue;
		return isStateMatch || isCityMatch;
	});

	const locationFullMatch = locationMapping.some((mapLocation) => {
		const isStateMatch = mapLocation.stateValue === location.stateValue;
		const isCityMatch = mapLocation.cityValue === location.cityValue;
		return isStateMatch || isCityMatch;
	});

	if (locationPartialMatch) {
		locationScore += 1.5;
	}

	if (locationFullMatch) {
		locationScore += 2;
	}

	const locationFinalPercent = (locationScore / requestLocation.length) * 100;

	return locationFinalPercent;
};

export const getCandidateNoticeScore = (noticePeriod: number | null, expectedNotice: Array<string>): number => {
	if (noticePeriod === null) {
		return 0;
	}

	const indexFound = expectedNotice.findIndex((index) => index === noticePeriod.toString());

	if (indexFound < 0) {
		return 0;
	}

	if (indexFound === 0) return 100;

	const percent = (indexFound / expectedNotice.length) * 100;
	return percent;
};

export const getCandidateSalaryScore = (
	currentSalary: number,
	expectedSalary: number | null,
	minSalary: number,
	maxSalary: number
): number => {
	const computedMinSalary = minSalary === 0 ? 0 : minSalary * 100000;
	const computedMaxSalary = maxSalary === 0 ? 0 : maxSalary * 100000;
	const salary = expectedSalary ? expectedSalary : currentSalary;

	const salaryRange = computedMaxSalary - computedMinSalary;
	const normalizedSalary = ((salary - computedMinSalary) / salaryRange) * 10;
	return normalizedSalary > 100 ? 100 : parseFloat(normalizedSalary.toFixed(2));
};
