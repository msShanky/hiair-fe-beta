import React from "react";
import Lottie from "react-lottie";
import { Button, Title, Group } from "@mantine/core";
import * as candidateHiring from "helpers/animations/we-are-hiring.json";
import { PercentileSelector } from "./PercentileSelector";
import { candidateSelectionTuning } from "copy";
import { useForm } from "@mantine/form";

type CandidateTuningProps = {
	handleFormSubmit: (values: CandidateTuningForm) => void;
	initialFormValues: CandidateTuningForm;
	prevStep: () => void;
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
	const { handleFormSubmit, initialFormValues, prevStep } = props;
	const form = useForm<CandidateTuningForm>({ initialValues: { ...initialFormValues } });

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
					<Title order={1} className="mb-12 text-4xl font-thin dark:text-secondaryYellow text-primaryAlt">
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
			<Group position="center" mt="xl">
				<Button variant="default" type="button" className="text-white hover:text-black" onClick={prevStep}>
					Back
				</Button>
				<Button
					type="submit"
					disabled={!form.isValid()}
					className={
						"text-black hover:text-secondaryYellow dark:hover:bg-primaryAlt active:text-secondaryYellow dark:text-white dark:hover:text-black bg-none hover:bg-black dark:bg-primary disabled:bg-slate-300 dark:disabled:bg-slate-300 dark:disabled:text-black disabled:hover:cursor-not-allowed hover:cursor-pointer"
					}
				>
					Next step
				</Button>
			</Group>
		</form>
	);
};
