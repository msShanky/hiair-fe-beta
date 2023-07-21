import { Drawer, Title } from "@mantine/core";
import React from "react";

type CandidateProfileDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: CandidateWithRelation;
};

export const CandidateProfileDrawer = (props: CandidateProfileDrawerProps) => {
	const { isOpen, onClose, candidate } = props;

	const { fullName } = candidate;

	return (
		<Drawer opened={isOpen} onClose={onClose} title="Candidate Profile" padding="xl" position="right" size="60%">
			<Title>{fullName}</Title>
		</Drawer>
	);
};
