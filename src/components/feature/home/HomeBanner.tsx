import { Button, Image, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

const HomeBanner = () => {
	const router = useRouter();

	return (
		<section className="w-full bg-violet-light min-h-[764px] flex items-center">
			<div className="container flex flex-row items-center mx-auto space-x-10">
				<div className="w-3/6 space-y-8">
					<Title className="font-serif text-5xl leading-snug text-black">Welcome To The New Age HiAiRing!</Title>
					<Text className="text-violet-subtext">Harness the power of AI & Machine learning in recruitment</Text>
					<Button onClick={() => router.push("/onboarding")} className="text-white bg-primary hover:bg-secondary">
						Try Now!
					</Button>
				</div>
				<div className="flex justify-center w-3/6">
					<Image className="w-4/5" src="/images/animated_landing.svg" alt="under construction" />
				</div>
			</div>
		</section>
	);
};

export default HomeBanner;
