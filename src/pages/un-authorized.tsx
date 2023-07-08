import { NextPage } from "next";
import React from "react";
import { AppLayout } from "../components";
import { Title, Text } from "@mantine/core";
import { signIn } from "next-auth/react";

const UnAuthorizedPage: NextPage = () => {
	return (
		<AppLayout title="Hiair Beta">
			<section className="container flex flex-col items-center p-2 mx-auto mt-12 gap-y-8">
				<Title className="font-normal text-center">
					The user is not authorized to view the content try to login to gain access.
				</Title>
				<button
					onClick={() => signIn(undefined, { callbackUrl: "/hiair-beta" })}
					className="flex flex-col items-center justify-center w-4/12 p-4 transition duration-300 rounded-md group bg-secondaryYellow hover:cursor-pointer"
				>
					<Text className="text-xl text-center text-black">Login</Text>
					<span className="block h-1 transition-all duration-500 rounded-full max-w-0 group-hover:max-w-full group-hover:w-6/12 bg-primaryAlt"></span>
				</button>
			</section>
		</AppLayout>
	);
};

export default UnAuthorizedPage;
