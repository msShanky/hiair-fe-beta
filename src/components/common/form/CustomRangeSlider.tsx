import React, { FC } from "react";
import { Input, Text, RangeSlider } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type CustomRangeSliderProps = {
	form: UseFormReturnType<any>;
	field: string;
	label: string;
};

export const CustomRangeSlider: FC<CustomRangeSliderProps> = (props) => {
	const { form, field, label } = props;
	const isExperience = field === "experience";
	const startValue = form.values[field][0];
	const endValue = form.values[field][1];
	const startValueSuffix = isExperience ? (startValue < 9 ? "yr" : "yrs") : startValue < 9 ? "lack" : "lacks";
	const endValueSuffix = isExperience ? (endValue < 9 ? "yr" : "yrs") : endValue < 9 ? "lack" : "lacks";

	const getLabelSuffix = (value: number) => (isExperience ? (value < 9 ? "yr" : "yrs") : value < 9 ? "lack" : "lacks");

	return (
		<Input.Wrapper classNames={{ label: "dark:text-white text-black" }} label={label} withAsterisk>
			<div className="flex items-center gap-6 mt-4">
				<Text className="text-black dark:text-white">
					Min: {startValue} {startValueSuffix}
				</Text>
				<Text className="text-black dark:text-white">
					Max: {endValue} {endValueSuffix}
				</Text>
			</div>
			<RangeSlider
				step={1}
				min={0}
				max={30}
				minRange={2}
				{...form.getInputProps(field)}
				label={(value) => `${value} ${getLabelSuffix(value)}`}
				className="mt-8"
			/>
		</Input.Wrapper>
	);
};
