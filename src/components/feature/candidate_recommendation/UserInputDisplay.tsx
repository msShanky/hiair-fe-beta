import { Text, Title, Badge } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import React from "react";

type UserInputDisplayProps = {
	candidateRequest: CandidateRequestForm;
	candidateKey: keyof CandidateRequestForm;
};

const getFormattedSuffix = (key: keyof CandidateRequestForm, value?: any) => {
	if (value === 0 && key === "notice_period") {
		return "Immediate";
	}

	switch (key) {
		case "experience":
			return "years";

		case "turn_around_time":
			return "days";

		case "notice_period":
			return "month";

		case "salary_range":
			return "lacks";

		default:
			break;
	}
};

export const UserInputDisplay = (props: UserInputDisplayProps) => {
	const { candidateRequest, candidateKey } = props;

	const fieldValues = candidateRequest[candidateKey as keyof typeof candidateRequest];
	const isArray = Array.isArray(fieldValues);

	return (
		<div className={`flex flex-col gap-y-2 ${isArray && "w-full"}`}>
			<Title className="text-base font-normal text-primary" order={3}>
				{upperFirst(candidateKey.split("_").join(" "))}
			</Title>
			<div className="flex flex-wrap gap-4">
				{isArray ? (
					fieldValues.map((value, index) => {
						const uniqueValue = `${value}_${(index + 5) * 44}`;
						return (
							<Badge key={uniqueValue}>
								{value !== 0 ? value : null} {getFormattedSuffix(candidateKey, value)}
							</Badge>
						);
					})
				) : (
					<Text className="text-lg">
						{!fieldValues ? "NA" : fieldValues} {getFormattedSuffix(candidateKey)}
					</Text>
				)}
			</div>
		</div>
	);
};
