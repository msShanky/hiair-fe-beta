import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "../components/layout/AppLayout";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { Title, Text, TextInput, Select, Divider, NumberInput, Button } from "@mantine/core";

const OnBoardingPage: NextPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();

	return (
		<AppLayout>
			<>
				<Head>
					<title>HiAir | On Boarding</title>
				</Head>
				<section className="container flex flex-col mx-auto mt-20 gap-y-6">
					{/* <div className="flex flex-col gap-2"> */}
					<Title className="mb-10 text-2xl text-secondary" order={1}>
						About you
					</Title>
					{/* <Text className="text-base">to curate the best recommendations</Text> */}
					{/* </div> */}
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col">
							<Title className="text-xl text-secondary" order={1}>
								Personal Info
							</Title>
							<Text className="text-base">Provide your personal information</Text>
						</div>
						<div className="flex flex-row gap-4">
							<Select
								placeholder="Gender"
								className="w-1/4"
								data={[
									{ value: "male", label: "Male" },
									{ value: "female", label: "Female" },
									{ value: "other", label: "Other" },
								]}
							/>
							<TextInput className="w-full" placeholder="First Name" />
							<TextInput className="w-full" placeholder="Second Name" />
						</div>
					</div>
					<Divider />
					<div className="grid grid-cols-2 gap-4">
						<div className="flex flex-col">
							<Title className="text-xl text-secondary" order={1}>
								Organization Info
							</Title>
							<Text className="text-base">Provide your organization information</Text>
						</div>
						<div className="flex flex-col gap-4">
							<TextInput className="w-full" label="Name Of Organization" placeholder="Hiair" />
							<Select
								placeholder="Please select a role"
								label="Role"
								data={[
									{ value: "recruiter", label: "Recruiter" },
									{ value: "hiring_manager", label: "Hiring Manager" },
									{ value: "project_manager", label: "Project Manager" },
									{ value: "cxo", label: "CXO" },
								]}
							/>
							<NumberInput label="Expected No Of Hiring Per Month" className="w-full" placeholder="10" />
						</div>
					</div>
					<div className="flex self-end gap-10 mt-24">
						<Button
							onClick={() => router.push("/candidate-request")}
							className="w-32 text-white bg-secondary hover:bg-secondary hover:bg-opacity-30"
						>
							skip
						</Button>
						<Button
							onClick={() => router.push("/candidate-request")}
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

export default OnBoardingPage;
