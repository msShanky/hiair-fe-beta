import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { Title, Text, TextInput, Select, MultiSelect, NumberInput, Button, RangeSlider, Input } from "@mantine/core";

const CandidateRequestPage: NextPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();

	return (
		<AppLayout>
			<>
				<Head>
					<title>HiAir | Candidate Request</title>
				</Head>
				<section className="container flex flex-col mx-auto mt-20 gap-y-6">
					<Title className="mb-10 text-2xl text-secondary" order={1}>
						Candidate Request Creation
					</Title>
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col">
							<Title className="text-xl text-secondary" order={1}>
								Hiring Info
							</Title>
							<Text className="text-base">Provide your hiring parameters</Text>
						</div>
						<div className="flex flex-col gap-4">
							<TextInput className="w-full" label="Role" placeholder="Software Developer" />
							<Select
								label="Domain"
								placeholder="please select a domain"
								data={[
									{ value: "IT", label: "Information Technology" },
									{ value: "other", label: "Other" },
								]}
							/>
							<Select
								label="Industry"
								placeholder="Please select an industry"
								data={[
									{ value: "IT", label: "Information Technology" },
									{ value: "others", label: "Others" },
								]}
							/>
							<Select
								label="Experience"
								placeholder="Please select experience"
								data={[
									{ value: "0", label: "Fresher" },
									{ value: "1-3", label: "1-3 Years" },
									{ value: "3-6", label: "3-6 years" },
									{ value: "6-10", label: "6-10 Years" },
									{ value: "10-15", label: "10-15 Years" },
									{ value: "15+", label: "15+ Years" },
								]}
							/>
							<MultiSelect
								label="Job Location"
								placeholder="Please select preferred location"
								data={[
									{ value: "Chennai", label: "Chennai" },
									{ value: "Bangalore", label: "Bangalore" },
									{ value: "Delhi", label: "Delhi" },
									{ value: "Mumbai", label: "Mumbai" },
									{ value: "Hyderabad", label: "Hyderabad" },
									{ value: "Ahmedabad", label: "Ahmedabad" },
									{ value: "Kolkata", label: "Kolkata" },
									{ value: "Pune", label: "Pune" },
									{ value: "Jaipur", label: "Jaipur" },
								]}
							/>
							<MultiSelect
								label="Skill Set"
								placeholder="Please select skill set"
								data={[
									{ value: "Javascript", label: "Javascript" },
									{ value: "Typescript", label: "Typescript" },
									{ value: "React", label: "React" },
									{ value: "Redux", label: "Redux" },
									{ value: "HTML", label: "HTML" },
									{ value: "CSS", label: "CSS" },
									{ value: "C++", label: "C++" },
									{ value: "JAVA", label: "JAVA" },
									{ value: "SQL", label: "SQL" },
									{ value: "SPRING", label: "SPRING" },
									{ value: "Spring Boot", label: "Spring Boot" },
									{ value: "PHP", label: "PHP" },
									{ value: "C#", label: "C#" },
									{ value: ".net", label: ".net" },
									{ value: "Oracle", label: "Oracle" },
									{ value: "others", label: "Others" },
								]}
							/>
							<MultiSelect
								label="Notice Period"
								placeholder="Please select notice period"
								data={[
									{ value: "0", label: "Immediate" },
									{ value: "1", label: "1 Month" },
									{ value: "2", label: "2 Months" },
									{ value: "3", label: "3 Months" },
								]}
							/>
							<Input.Wrapper label="Salary Range">
								<RangeSlider min={1} max={80} label={(value) => `${value} Lacks`} defaultValue={[3, 12]} />
							</Input.Wrapper>
							<NumberInput label="HiAiR Turn Around Time" className="w-full" placeholder="10" />
							<NumberInput label="No.of Profiles Required" className="w-full" placeholder="10" />
						</div>
					</div>
					<div className="flex self-end gap-10 mt-24">
						<Button
							onClick={() => console.log("the next button is clicked")}
							className="w-32 text-white bg-secondary hover:bg-secondary hover:bg-opacity-30"
						>
							skip
						</Button>
						<Button
							onClick={() => console.log("the next button is clicked")}
							className="w-32 text-white bg-primary hover:bg-primary hover:bg-opacity-30"
						>
							Next
						</Button>
					</div>
				</section>
			</>
		</AppLayout>
	);
};

export default CandidateRequestPage;
