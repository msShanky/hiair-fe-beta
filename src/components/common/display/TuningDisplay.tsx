import React, { FC } from "react";
import { Title, Slider } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";

type TuningDisplayProps = {
	label: string;
	value: any;
};

// Configure marks to match step
const MARKS = [
	{ value: 0, label: "0" },
	{ value: 25, label: "25" },
	{ value: 50, label: "50" },
	{ value: 75, label: "75" },
	{ value: 100, label: "100" },
];

export const TuningDisplay: FC<TuningDisplayProps> = (props) => {
	const { label, value } = props;
	return (
		<div className="flex flex-col col-span-4 py-2 gap-y-2">
			<Title className="text-base font-normal text-primary" order={4}>
				{upperFirst(label)}
			</Title>
			<Slider value={value} marks={MARKS} className="mr-6" />
		</div>
	);
};
