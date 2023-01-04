import { Modal, Text, Rating } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import React from "react";

type CandidateRatingModalProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: Candidate;
};

type CandidateRatingFieldTypes = Array<keyof CandidateRequestForm>;

const candidateRatingFields: CandidateRatingFieldTypes = [
	"role",
	"skill_set",
	"experience",
	"job_location",
	"notice_period",
	"salary_range",
	"domain",
	"industry",
];

export const CandidateRatingModal = (props: CandidateRatingModalProps) => {
	const { isOpen, onClose } = props;

	return (
		<Modal opened={isOpen} onClose={onClose} title="Candidate Rating!" withCloseButton={false} centered size="lg">
			<Text>Please provide rating for the current candidate</Text>
			<div>
				{candidateRatingFields.map((key, index) => {
					const uniqueKey = `candidate_rating_${key}_${index + 55}`;
					return (
						<div key={uniqueKey}>
							<Text>{upperFirst(key.split("_").join(" "))}</Text>
							<Rating />
						</div>
					);
				})}
			</div>
		</Modal>
	);
};
