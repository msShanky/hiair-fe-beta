import React, { FC } from "react";
import { Button, Group, Text, Title, Card, Divider, Badge } from "@mantine/core";
import { useAppSelector } from "app/hooks";
import { IconUsers, IconBriefcase, IconCoins } from "@tabler/icons-react";

type PreviewJDProps = {
	prevStep: () => void;
	nextStep: () => void;
};

export const PreviewJD: FC<PreviewJDProps> = (props) => {
	const { prevStep, nextStep } = props;

	const { candidateRequest, companyInfo } = useAppSelector((state) => state.userSession);

	const {
		jobTitle,
		experience,
		salaryRange,
		jobLocation,
		keySkills,
		modeOfWork,
		optionalSkills,
		availablePosition,
		educationQualification,
	} = candidateRequest;
	const { companySize, name, companyType, about } = companyInfo;

	return (
		<>
			<summary className="grid grid-cols-[70%_28%] gap-4 list-none">
				<section className="flex flex-col gap-4">
					<Card className="flex flex-col bg-slate-300 gap-x-2 gap-y-4">
						<Title className="text-3xl font-semibold">{jobTitle}</Title>
						<Text className="text-2xl font-normal">{name}</Text>
						<div className="flex flex-row gap-2 ">
							{/* Experience */}
							<div className="flex flex-row items-center gap-4">
								<IconBriefcase className="w-4 h-4" />
								<Text className="flex flex-row items-center gap-x-1">
									{`${experience[0]}`}
									{/* {`${experience[0]} ${experience[0] <= 0 ? "Year" : "Years"}`} */}
									<span>-</span>
									{`${experience[1]} years`}
								</Text>
							</div>
							<Divider size="sm" orientation="vertical" color="black" />
							{/* Salary Range */}
							<div className="flex flex-row items-center gap-2">
								<IconCoins className="w-4 h-4" />
								<Text className="flex flex-row items-center gap-x-1">
									{`${salaryRange[0]}`}
									{/* {`${salaryRange[0]} ${salaryRange[0] <= 9 ? "Lack" : "Lacks"}`} */}
									<span>-</span>
									{`${salaryRange[1]} lacks`}
								</Text>
							</div>
						</div>
						{/* Job Location */}
						<div className="flex flex-col gap-y-2">
							<Text className="font-normal text-md">Job Location</Text>
							<div className="flex flex-wrap gap-4">
								{jobLocation.map((location, index) => {
									return <Badge key={`location_${(index + 45) * 7895645}_${location}`}>{location}</Badge>;
								})}
							</div>
						</div>
						{/* Key Skills */}
						<div className="flex flex-col gap-y-2">
							<Text className="font-normal text-md">Key Skills</Text>
							<div className="flex flex-wrap gap-4">
								{keySkills.map((skill, index) => {
									return <Badge key={`skill_${(index + 84) * 7895645}_${skill}`}>{skill}</Badge>;
								})}
							</div>
						</div>
						{/* Optional Skills */}
						{optionalSkills && (
							<div className="flex flex-col gap-y-2">
								<Text className="font-normal text-md">Optional Skills</Text>
								<div className="flex flex-wrap gap-4">
									{optionalSkills.map((skill, index) => {
										return <Badge key={`skill_optional_${(index + 84) * 7895645}_${skill}`}>{skill}</Badge>;
									})}
								</div>
							</div>
						)}
					</Card>
					<Card className="flex flex-col bg-stone-300 gap-y-2">
						<Title className="text-lg font-normal">Additional Information</Title>
						<Text>Mode of work: {modeOfWork?.toLocaleUpperCase()}</Text>
						<Text>availablePosition: {availablePosition}</Text>
						<Text>Education: {educationQualification}</Text>
					</Card>
				</section>
				<aside className="rounded-md">
					<Card className="bg-primaryAlt">
						<Text className="py-2 font-sans text-white text-md">Company Information</Text>
						<div>
							<Text className="text-lg font-bold">{name}</Text>
							<Text className="flex items-center gap-2">
								Company Size: <IconUsers className="w-4 h-4" /> {companySize}
							</Text>
							<Text className="flex items-center gap-2">Company Type: {companyType?.toUpperCase()}</Text>
							<div className="flex flex-col pt-2 gap-y-2">
								<Text className="font-bold">About</Text>
								<Text className="">{about}</Text>
							</div>
						</div>
					</Card>
				</aside>
			</summary>
			<Group className="" position="center" mt="xl">
				<Button variant="default" type="button" className="text-white hover:text-black" onClick={prevStep}>
					Back
				</Button>
				<Button
					onClick={nextStep}
					className={
						"text-black hover:text-secondaryYellow dark:hover:bg-primaryAlt active:text-secondaryYellow dark:text-white dark:hover:text-black bg-none hover:bg-black dark:bg-primary disabled:bg-slate-300 dark:disabled:bg-slate-300 dark:disabled:text-black disabled:hover:cursor-not-allowed hover:cursor-pointer"
					}
				>
					Next step
				</Button>
			</Group>
		</>
	);
};
