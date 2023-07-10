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
		<div className="flex items-center w-full gap-4">
			<Text className="flex items-center w-4/12 gap-2 text-2xl text-black dark:text-white">
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
