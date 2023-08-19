import { Divider } from "@mantine/core";
import React from "react";

type CandidateTrailCardProps = {
	index: number;
	color: string;
	count?: number;
};

export const CandidateTrailCard = (props: CandidateTrailCardProps) => {
	const { index, color, count = 5 } = props;
	const bottomValue = index + 7 - index * 2;

	return (
		<div
			className={`absolute flex flex-col items-center justify-center p-6 text-center text-white rounded-lg  drop-shadow-lg  w-[490px] h-[430px] hover:cursor-pointer gap-y-4`}
			style={{
				bottom: `${bottomValue}rem`,
				zIndex: count - index,
				backgroundColor: color,
			}}
		>
			<div className="w-full h-20 text-3xl text-white rounded-md line-clamp-2 bg-white/60 animate-pulse" />
			<div className="font-sans text-lg font-light rounded-md h-14 line-clamp-2 bg-white/60 animate-pulse" />
			<div className="flex items-center h-8 gap-4 bg-white/60 animate-pulse"></div>
			<Divider className="w-full my-4 stroke-white" />
			<div className="flex flex-row justify-between gap-6">
				<span className="flex flex-col h-20 rounded-md gap-y-2 bg-white/40">
					<div className="text-sm uppercase" />
					<div className="text-2xl font-thin" />
					<div className="text-xs font-thin" />
				</span>
				<span className="flex flex-col h-20 rounded-md gap-y-2 bg-white/40">
					<div className="text-sm uppercase" />
					<div className="text-2xl font-thin" />
					<div className="text-xs font-thin" />
				</span>
				<span className="flex flex-col h-20 rounded-md gap-y-2 bg-white/40">
					<div className="text-sm uppercase" />
					<div className="text-2xl font-thin" />
					<div className="text-xs font-thin" />
				</span>
			</div>
		</div>
	);
};
