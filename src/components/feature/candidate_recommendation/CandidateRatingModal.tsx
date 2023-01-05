import { useEffect } from "react";
import { Modal, Text, Rating, Button } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";

type CandidateRatingModalProps = {
	isOpen: boolean;
	onClose: () => void;
	candidate: Candidate;
	handleRatingsSubmit: (formValues: CandidateRatingForm) => void;
};

const candidateRatingFields: CandidateRatingFields = [
	"role",
	"skill_set",
	"experience",
	"job_location",
	"notice_period",
	"salary_range",
];

// TODO: Capture the information on a form and submit it once the changes are captured
// TODO: Add validations for the ratings ?
// TODO: Dispatch the event to track the changes on the global state

export const CandidateRatingModal = (props: CandidateRatingModalProps) => {
	const { isOpen, onClose, handleRatingsSubmit } = props;

	const formInitialState = {
		role: 0,
		experience: 0,
		job_location: 0,
		skill_set: 0,
		notice_period: 0,
		salary_range: 0,
	};

	const form = useForm<CandidateRatingForm>({ initialValues: formInitialState });

	useEffect(() => {
		return () => {
			form.reset();
		};
	}, []);

	const handleFormSubmit = (values: CandidateRatingForm) => {
		handleRatingsSubmit(values);
		setTimeout(() => {
			console.log(" ********* Ratings are destroyed now ********* ");
			form.reset();
		}, 250);
	};

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Candidate Rating!"
			withCloseButton={false}
			centered
			size="lg"
			closeOnClickOutside={false}
			classNames={{
				title: "text-2xl text-secondaryAlt",
			}}
		>
			<Text className="font-bold text-primary">Please provide rating for the current candidate</Text>
			<form onSubmit={form.onSubmit(handleFormSubmit)} className="flex flex-col my-10 gap-y-8">
				{candidateRatingFields.map((key, index) => {
					const uniqueKey = `candidate_rating_${key}_${index + 55}`;
					return (
						<div className="grid grid-cols-[40%_60%] flex-row gap-10" key={uniqueKey}>
							<Text>{upperFirst(key.split("_").join(" "))}</Text>
							<Rating {...form.getInputProps(key)} size="xl" />
						</div>
					);
				})}
				<div className="flex justify-end gap-10 px-4">
					<Button
						onClick={() => handleFormSubmit(formInitialState)}
						type="reset"
						className="text-black bg-primaryAlt hover:bg-primary/60"
					>
						Skip
					</Button>
					<Button type="submit" className="text-white bg-primary hover:bg-primaryAlt/60">
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};
