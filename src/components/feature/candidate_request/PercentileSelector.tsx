import { Slider, Text } from "@mantine/core";
import React from "react";

type PercentileSelectorProps = {
	label: string;
	setValue: (value: number) => void;
	value: number;
};

export const PercentileSelector = (props: PercentileSelectorProps) => {
	const { label, setValue, value } = props;

	return (
		<div className="flex gap-4 w-full items-center">
			<Text className="w-4/12 text-2xl items-center flex gap-2 dark:text-secondaryYellow text-black">
				{label}
				<span className="text-base">{value} %</span>
			</Text>

			<Slider
				className="w-8/12"
				onChange={(value) => setValue(value)}
				defaultValue={50}
				marks={[
					{ value: 20, label: "20%" },
					{ value: 50, label: "50%" },
					{ value: 80, label: "80%" },
				]}
			/>
		</div>
	);
};
