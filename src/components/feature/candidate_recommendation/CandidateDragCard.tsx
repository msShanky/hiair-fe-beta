import React from "react";
import { Divider, Text, Title } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import { motion, MotionStyle } from "framer-motion";

type CandidateDragCardProps = {
	candidate: CandidateWithRelation;
	style: MotionStyle | undefined;
};

export const CandidateDragCard = (props: CandidateDragCardProps) => {
	const { totalExperience, currentSalary, firstName, lastName, location, noticePeriod } = props.candidate;

	return (
		<motion.div
			className="flex flex-col items-center justify-center p-6 text-center text-white rounded-lg drop-shadow-lg bg-primary w-96 h-96 hover:cursor-pointer gap-y-4"
			drag
			dragElastic={1}
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragSnapToOrigin
		>
			<Title className="w-full h-20 text-3xl text-white line-clamp-2">
				{firstName} {lastName}
			</Title>
			<div className="flex items-center gap-4">
				<IconMapPin />
				<Text>{`${location?.city}, ${location?.state}`}</Text>
			</div>
			<Divider className="w-full my-4 stroke-white" />
			<div className="flex flex-row justify-between gap-6">
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">current ctc</Text>
					<Text className="text-2xl font-thin">{currentSalary}</Text>
					<Text className="text-xs font-thin">lacks</Text>
				</span>
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">experience</Text>
					<Text className="text-2xl font-thin">{totalExperience}</Text>
					<Text className="text-xs font-thin">years</Text>
				</span>
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">notice period</Text>
					<Text className="text-2xl font-thin">{noticePeriod}</Text>
					<Text className="text-xs font-thin">months</Text>
				</span>
			</div>
		</motion.div>
	);
};
