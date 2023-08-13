import React, { FC } from "react";
import { Text, Tabs } from "@mantine/core";
import {
	BadgeDisplay,
	RequestLocationDisplay,
	RequestSkillDisplay,
	TextDisplay,
	TuningDisplay,
} from "@/components/common/display";
import { IconClipboardData, IconSettings } from "@tabler/icons-react";

type CandidateRequestInfoProps = {
	candidateRequest: CandidateRequestWithRelation | undefined;
};

export const CandidateRequestInfo: FC<CandidateRequestInfoProps> = (props) => {
	const { candidateRequest } = props;
	if (!candidateRequest) {
		return (
			<div className="w-full px-8">
				<Text>No Candidate Request Available</Text>
			</div>
		);
	}

	const { refId, jobTitle, education, modeOfWork, status, createdAt } = candidateRequest;
	const { availablePosition, maxExperience, minExperience, maxSalary, minSalary } = candidateRequest;
	// @ts-ignore
	const { keySkills, optionalSkills, locations, candidateTuning } = candidateRequest;

	const { experienceWeight, locationWeight, noticePeriodWeight, salaryWeight, skillWeight } = candidateTuning[0];

	return (
		<div className="grid grid-cols-4 gap-4 mt-4">
			<TextDisplay label="Request Id" value={refId} />
			<TextDisplay label="Job Title" value={jobTitle} />
			<TextDisplay label="Mode of work" value={modeOfWork} />
			<BadgeDisplay label="Status" value={status} />
			<TextDisplay label="Min Experience" value={minExperience} />
			<TextDisplay label="Max Experience" value={maxExperience} />
			<TextDisplay label="Min Salary" value={minSalary} />
			<TextDisplay label="Max Salary" value={maxSalary} />
			<TextDisplay label="Available positions" value={availablePosition} />
			<TextDisplay label="Education" value={education} />
			<TextDisplay label="Created At" value={new Date(createdAt).toLocaleDateString()} />
			{/* @ts-ignore */}
			<RequestSkillDisplay label="Key Skills" value={keySkills} />
			{/* @ts-ignore */}
			<RequestSkillDisplay label="Optional Skills" value={optionalSkills} />
			<RequestLocationDisplay label="Locations" value={locations} />

			<TuningDisplay label="Skill Weight" value={skillWeight} />
			<TuningDisplay label="Salary Weight" value={salaryWeight} />
			<TuningDisplay label="Notice period Weight" value={noticePeriodWeight} />
			<TuningDisplay label="Location Weight" value={locationWeight} />
			<TuningDisplay label="Experience Weight" value={experienceWeight} />

			{/* Key Skills */}
			{/* Optional Skills */}
			{/* Location */}
			{/* {candidateRequest &&
				Object.keys(candidateRequest).map((candidateKey) => {
					return (
						<UserInputDisplay
							key={`candidate_request_${candidateKey}`}
							// @ts-ignore
							candidateKey={candidateKey as keyof typeof candidateRequest}
							// @ts-ignore
							candidateRequest={candidateRequest}
						/>
					);
				})} */}
		</div>
	);
};
