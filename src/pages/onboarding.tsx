import type { NextPage } from "next";
import Head from "next/head";
import { OnBoardingLayout } from "@/components/layout";
import { useRouter } from "next/router";
import { Title, Text, TextInput, Select, Divider, NumberInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { staticHiringRole } from "copy";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { updateOnBoarding, createUserSession } from "@/reducer/userSession";
import { nanoid } from "@reduxjs/toolkit";

import { v4 as uuid4 } from "uuid";

const OnBoardingPage: NextPage = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userSession = useAppSelector((state) => state.userSession);

	const form = useForm<OnBoardingForm>({
		initialValues: userSession.onBoardingInfo,
		validate: {
			firstName: (value) => {
				if (!value) {
					return "Please enter a valid name";
				}
				if (value.length < 3) {
					return "Please enter a valid name";
				}
				return null;
			},
		},
	});

	const handleFormSubmit = (values: OnBoardingForm) => {
		const sessionId = nanoid();
		const userId = uuid4();
		dispatch(updateOnBoarding(values));
		dispatch(createUserSession({ sessionId, userId }));
		router.push("/candidate-request");
	};

	// TODO: Onboarding should be an introduction to the whole process
	// TODO: Move the whole form to user profile page where the user can view that list of sessions and sync with google credentials

	return (
		<OnBoardingLayout>
			<>
				<Head>
					<title>HiAir | On Boarding</title>
				</Head>
				<form onSubmit={form.onSubmit(handleFormSubmit)} className="container flex flex-col mx-auto mt-20 gap-y-6">
					<Title className="mb-10 text-2xl dark:text-white text-primaryAlt" order={1}>
						About you
					</Title>
					<div className="grid grid-cols-[35%_65%] gap-4">
						<div className="flex flex-col">
							<Title className="text-xl text-secondaryBlue" order={1}>
								Personal Info
							</Title>
							<Text className="text-base text-black dark:text-white">Provide your personal information</Text>
						</div>
						<div className="flex flex-row gap-4">
							<TextInput
								{...form.getInputProps("firstName")}
								withAsterisk
								className="w-full"
								placeholder="First Name"
							/>
							<TextInput {...form.getInputProps("lastName")} className="w-full" placeholder="Second Name" />
						</div>
					</div>
					<Divider />
					<div className="grid grid-cols-[35%_65%] gap-4">
						<div className="flex flex-col">
							<Title className="text-xl text-secondaryBlue" order={1}>
								Organization Info
							</Title>
							<Text className="text-base text-black dark:text-white">Provide your organization information</Text>
						</div>
						<div className="flex flex-col gap-4">
							<TextInput
								{...form.getInputProps("organization")}
								className="w-full"
								label="Name Of Organization"
								placeholder="Hiair"
							/>
							<Select
								{...form.getInputProps("role")}
								placeholder="Please select a role"
								label="Role"
								data={staticHiringRole}
							/>
							<NumberInput
								{...form.getInputProps("expected_hiring_count")}
								label="Expected No Of Hiring Per Month"
								className="w-full"
								placeholder="10"
							/>
						</div>
					</div>
					<div className="flex self-end gap-10 mt-24">
						<Button
							onClick={() => router.push("/candidate-request")}
							className="w-32 text-white bg-secondaryBlue hover:bg-secondary hover:bg-opacity-30"
							type="reset"
						>
							skip
						</Button>
						<Button
							disabled={!form.isValid()}
							className="w-32 text-white bg-primary hover:bg-primary hover:bg-opacity-30"
							type="submit"
						>
							Next
						</Button>
					</div>
				</form>
			</>
		</OnBoardingLayout>
	);
};

export default OnBoardingPage;
