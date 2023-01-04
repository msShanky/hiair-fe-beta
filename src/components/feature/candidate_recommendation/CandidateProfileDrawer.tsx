import { Drawer, Title } from "@mantine/core";
import React from "react";

type CandidateProfileDrawerProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: Candidate;
};

export const CandidateProfileDrawer = (props: CandidateProfileDrawerProps) => {
	const { isOpen, onClose, candidate } = props;

	const { full_name } = candidate;

	return (
		<Drawer
			opened={isOpen}
			onClose={onClose}
			title="Candidate Profile"
			padding="xl"
			position="right"
			size="60%"
			overlayOpacity={0.55}
			overlayBlur={3}
		>
			<Title>{full_name}</Title>
		</Drawer>
	);
};
