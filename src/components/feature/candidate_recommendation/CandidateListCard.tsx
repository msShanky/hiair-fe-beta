import { Button, Divider, Text, Title } from "@mantine/core";
import { IconMapPin } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationControls } from "framer-motion";

type CandidateListCardProps = {
	candidate: CandidateWithRelation;
	handleDragState: (state: boolean) => void;
	handleCandidateSelection: (state: boolean) => void;
	handleCandidateClick: () => void;
};

export const CandidateListCard = (props: CandidateListCardProps) => {
	const { candidate, handleDragState, handleCandidateSelection, handleCandidateClick } = props;
	const motionValueX = useMotionValue(0);
	const [selection, setSelection] = useState<boolean | null>(null);

	const handleCardDrop = (event: PointerEvent) => {
		if (event.clientX < 1000) {
			setSelection(true);
			handleCandidateSelection(true);
		}

		if (event.clientX > 1500) {
			setSelection(false);
			handleCandidateSelection(false);
		}
		handleDragState(false);
	};

	const { noticePeriod, currentSalary, location, fullName, summary, totalExperience } = candidate;

	return (
		<motion.div
			className="z-50 flex flex-col items-center justify-center p-6 text-center text-white rounded-lg drop-shadow-lg bg-primary w-96 h-[430px] hover:cursor-pointer gap-y-4"
			style={{ x: motionValueX }}
			initial={{ opacity: 0, y: 100 }}
			animate={{ opacity: 1, y: 0 }}
			exit={selection ? "exitSuccess" : "exitReject"}
			drag
			dragElastic={1}
			onDragStart={() => handleDragState(true)}
			dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
			dragSnapToOrigin
			onDragEnd={handleCardDrop}
		>
			<Title className="w-full h-20 text-3xl text-white line-clamp-2">{fullName}</Title>
			<Text className="font-sans text-lg font-light h-14 line-clamp-2">{summary}</Text>
			<div className="flex items-center gap-4">
				<IconMapPin />
				<Text>{`${location?.city ?? "NA"}, ${location?.state ?? "NA"}`}</Text>
			</div>
			<Divider className="w-full my-4 stroke-white" />
			<div className="flex flex-row justify-between gap-6">
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">current ctc</Text>
					<Text className="text-xl font-thin">{currentSalary}</Text>
					<Text className="text-xs font-thin">lacks</Text>
				</span>
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">experience</Text>
					<Text className="text-xl font-thin">{totalExperience}</Text>
					<Text className="text-xs font-thin">years</Text>
				</span>
				<span className="flex flex-col gap-y-2">
					<Text className="text-sm uppercase">notice period</Text>
					<Text className="text-xl font-thin">{noticePeriod}</Text>
					<Text className="text-xs font-thin">months</Text>
				</span>
			</div>
			<div>
				<Button className="text-black bg-white hover:bg-primaryAlt" onClick={handleCandidateClick}>
					More Info
				</Button>
			</div>
		</motion.div>
	);
};
