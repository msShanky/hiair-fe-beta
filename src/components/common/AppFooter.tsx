import { Button, Text, TextInput, Title } from "@mantine/core";
import React from "react";

const AppHeader = () => {
	return (
		<footer className="w-full bg-violet-light h-96 border-t-2 border-t-primary dark:border-t-white mt-10 bg-primary">
			<section className="container flex pt-10 mx-auto space-x-20">
				<div className="w-1/3 space-y-4">
					<Title className="text-4xl text-primaryAlt">HiAir</Title>
					<Text className="text-white">Human Integrated, autonomous & intelligent recruiter</Text>
				</div>
				<div className="w-1/3 space-y-4">
					<Title className="text-xl font-sans font-bold text-primaryAlt">Contact Info</Title>
					<Text className="text-white">sanj@hiair.in</Text>
				</div>
			</section>
		</footer>
	);
};

export default AppHeader;
