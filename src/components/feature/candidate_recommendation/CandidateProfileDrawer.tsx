import { TextDisplay, SkillDisplay, LocationDisplay } from "@/components/common/display";
import { Drawer, Title, Divider } from "@mantine/core";
import { Card, CategoryBar, Flex, Text } from "@tremor/react";
import React from "react";

type CandidateProfileDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: CandidateWithRelation;
};

export const CandidateProfileDrawer = (props: CandidateProfileDrawerProps) => {
	const { isOpen, onClose, candidate } = props;

	const { fullName, skills, desiredLocations } = candidate;
	
	return (
		<Drawer opened={isOpen} onClose={onClose} title="Candidate Profile" padding="xl" position="right" size="60%">
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
				<TextDisplay label="Current Salary (PA)" value={candidate.currentSalary} />
				<TextDisplay label="Expected Salary (PA)" value={candidate.expectedSalary} />
				<TextDisplay label="Notice Period" value={candidate.noticePeriod} />
				<Divider className="col-span-4" />
				<SkillDisplay label="Skills" value={skills} />
				<LocationDisplay label="Desired Location" value={desiredLocations} />
			</div>
		</Drawer>
	);
};
