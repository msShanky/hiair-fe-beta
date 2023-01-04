import { Button, Title } from "@mantine/core";
import React from "react";
import Lottie from "react-lottie";
import * as candidateHiring from "helpers/animations/we-are-hiring.json";
import { PercentileSelector } from "./PercentileSelector";
import { candidateSelectionTuning } from "copy";
import { useForm } from "@mantine/form";

type CandidateTuningProps = {
	handleFormSubmit: (values: CandidateTuningForm) => void;
	initialFormValues: CandidateTuningForm;
};

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: candidateHiring,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

export const CandidateTuning = (props: CandidateTuningProps) => {
	const { handleFormSubmit, initialFormValues } = props;
	const form = useForm<CandidateTuningForm>({ initialValues: initialFormValues });

	const handlePercentileChange = (value: number, key: string) => {
		form.setFieldValue(key, value);
	};

	return (
		<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto">
			<main className="flex mt-12">
				<aside>
					<Lottie options={defaultOptions} height={500} width={600} />
				</aside>
				<article className="w-6/12">
					<Title order={1} className="mb-12 text-4xl font-thin text-primaryAlt">
						What would be your preference for the below, when selecting a candidate!
					</Title>
					<div className="flex flex-col gap-y-9">
						{candidateSelectionTuning.map((tuningItem) => {
							const { key, label } = tuningItem;
							return (
								<PercentileSelector
									key={key}
									label={label}
									setValue={(value) => handlePercentileChange(value, key)}
									value={form.values[key as keyof CandidateTuningForm]}
								/>
							);
						})}
					</div>
				</article>
			</main>
			<div className="flex self-end gap-10 mt-24">
				<Button type="submit" className="w-32 text-white bg-primary hover:bg-primary hover:bg-opacity-30">
					Next
				</Button>
			</div>
		</form>
	);
};
