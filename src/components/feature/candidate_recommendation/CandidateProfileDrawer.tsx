
import { TextDisplay, SkillDisplay, LocationDisplay } from "@/components/common/display";
import { Drawer, Title, Divider } from "@mantine/core";
import { Card, Title as TremorTitle, BarChart, Subtitle } from "@tremor/react";
import { getINCurrencyFormat } from "helpers/common";
import React from "react";

type CandidateProfileDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: CandidateWithScore;
	candidateRequest: CandidateRequestResponse | undefined;
};

export const CandidateProfileDrawer = (props: CandidateProfileDrawerProps) => {
	const { isOpen, onClose, candidate, candidateRequest } = props;
	const { fullName, skills, desiredLocations, scores } = candidate;

	const tuningOptions = candidateRequest?.candidateTuning[0];

	const chartData = [
		{
			name: "Skill",
			Tuning: tuningOptions?.skillWeight ?? 0,
			Match: scores.skillScore,
		},
		{
			name: "Salary",
			Tuning: tuningOptions?.salaryWeight ?? 0,
			Match: scores.salaryScore,
		},
		{
			name: "Experience",
			Tuning: tuningOptions?.experienceWeight ?? 0,
			Match: scores.experienceScore,
		},
		{
			name: "NoticePeriod",
			Tuning: tuningOptions?.noticePeriodWeight ?? 0,
			Match: scores.noticePeriodScore,
		},
		{
			name: "Location",
			Tuning: tuningOptions?.locationWeight ?? 0,
			Match: scores.locationScore,
		},
	];

	return (
		<Drawer
			classNames={{
				content: "dark:bg-gray-400",
				header: "dark:bg-gray-400",
				close: "dark:text-white text-black",
			}}
			opened={isOpen}
			onClose={onClose}
			title="Candidate Profile"
			padding="xl"
			position="right"
			size="60%"
		>
			<Title>{fullName}</Title>
			<div className="grid grid-cols-4 gap-4 mt-6">
				<TextDisplay label="Candidate Id" value={candidate.candidateId} />
				<TextDisplay label="Birth Date" value={`${candidate.birthDate}/${candidate.birthYear}`} />
				<TextDisplay label="Age" value={candidate.age} />
				<TextDisplay label="Gender" value={candidate.gender} />
				<TextDisplay label="Email" value={candidate.email} />
				<TextDisplay label="Phone" value={candidate.phone} />
				<TextDisplay label="Current Location" value={`${candidate.location?.city}, ${candidate.location?.state}`} />
				<Divider className="col-span-4" />
				<TextDisplay label="Job Title" value={candidate.jobTitle} />
				<TextDisplay label="Total Experience (M)" value={candidate.totalExperience} />
				<TextDisplay label="Current Salary (PA)" value={getINCurrencyFormat(candidate.currentSalary)} />
				<TextDisplay
					label="Expected Salary (PA)"
					value={candidate.expectedSalary ? getINCurrencyFormat(candidate.expectedSalary) : 0}
				/>
				<TextDisplay label="Notice Period" value={candidate.noticePeriod} />
				<Divider className="col-span-4" />
				<SkillDisplay
					label="Skills"
					value={skills}
					requestedSkills={candidateRequest?.keySkills.concat(candidateRequest.optionalSkills)}
				/>
				<LocationDisplay
					label="Desired Location"
					value={desiredLocations}
					requestedLocations={candidateRequest?.jobLocation}
				/>
			</div>
			<section className="mt-6">
				{tuningOptions && (
					<Card className="bg-white outline-none ring-2 ring-secondaryYellow dark:ring-slate-400 dark:bg-gray-300">
						<Title className="font-sans text-xl font-light">Candidate Score Comparison</Title>
						<BarChart
							className="mt-6"
							data={chartData}
							index="name"
							categories={["Tuning", "Match"]}
							colors={["emerald", "teal"]}
							yAxisWidth={48}
						/>
					</Card>
				)}
			</section>
		</Drawer>
	);
};
