import React, { FC } from "react";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { useGetDashboardQuery } from "@/reducer/hiairBaseApi";
import { Title, Card, Flex, Text, Bold, BarList, BarChart } from "@tremor/react";
import { AnimatedNumericStat } from "../dashboard";
import { EmployeeSearch } from "@/components/common/loader";

type RecruiterLandingProps = {};

export const RecruiterLanding: FC<RecruiterLandingProps> = (props) => {
	const router = useRouter();
	const buttonBase = "text-black dark:hover:text-primary active:text-secondaryYellow bg-white hover:bg-primaryAlt";
	const { data, isLoading, isSuccess } = useGetDashboardQuery();

	if (isLoading || !isSuccess) {
		return <EmployeeSearch />;
	}

	const {
		candidateCount,
		candidateLocationCount,
		candidateSkillCount,
		candidateTitleCount,
		desiredLocationCount,
		totalNonTechSkills,
		totalTechSkills,
		topSkills,
		topLocations,
	} = data.jobPoolStats;

	return (
		<section>
			<div className="flex justify-end w-full gap-6 p-4 rounded-md bg-primary">
				<Button onClick={() => router.push("/candidates")} className={buttonBase}>
					Candidates
				</Button>
				<Button onClick={() => router.push("/candidate-request")} className={buttonBase}>
					Request
				</Button>
			</div>
			<section className="mt-10">
				<Card
					className={`w-full border-none bg-primaryAlt dark:bg-secondaryYellow ring-primary-focus dark:ring-primary-focus rounded-lg`}
				>
					<Title className="pb-4 text-2xl text-primary dark:text-black">Job Pool Stats</Title>
					<section className="flex flex-row flex-wrap items-center justify-between w-full gap-4 lg:grid-cols-8 md:items-end">
						<AnimatedNumericStat key={"candidateCount"} value={candidateCount} label="Total Candidates" />
						<AnimatedNumericStat
							key={"candidateLocationCount"}
							value={candidateLocationCount}
							label="Candidate Location"
						/>
						<AnimatedNumericStat key={"candidateTitleCount"} value={candidateTitleCount} label="Candidate Titles" />
						<AnimatedNumericStat key={"candidateSkillCount"} value={candidateSkillCount} label="Total Skills" />
						<AnimatedNumericStat
							key={"desiredLocationCount"}
							value={desiredLocationCount}
							label="Desired Candidate Location"
						/>
						<AnimatedNumericStat key={"totalTechSkills"} value={totalTechSkills} label="Technical Skills" />
						<AnimatedNumericStat key={"totalNonTechSkills"} value={totalNonTechSkills} label="Non Technical Skills" />
					</section>
				</Card>
				<section className="flex w-full gap-4 mt-10 text-white">
					<Card className="w-6/12 text-black bg-primaryAlt ring-0 dark:bg-gray-400">
						<Title className="font-normal text-white dark:text-black">Top Skills</Title>
						<Flex className="my-4">
							<Text>
								<Bold>Skill</Bold>
							</Text>
							<Text>
								<Bold>Candidates</Bold>
							</Text>
						</Flex>
						<BarList
							className="text-black dark:text-white"
							data={topSkills.map((skill) => {
								return { name: skill.label, value: skill.count };
							})}
						/>
					</Card>
					<Card className="w-6/12 bg-primaryAlt ring-0 dark:bg-gray-400">
						<Title className="font-normal text-white dark:text-black">Top Locations</Title>
						<BarChart
							className="mt-6"
							data={topLocations.map((location) => {
								return { name: `${location.city}, ${location.state}`, candidates: location.count };
							})}
							index="name"
							categories={["candidates"]}
							colors={["blue"]}
							yAxisWidth={40}
						/>
					</Card>
				</section>
			</section>
		</section>
	);
};
