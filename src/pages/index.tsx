import type { NextPage } from "next";
import Head from "next/head";
import { AppLayout } from "@/components/layout";
import { HomeBanner } from "@/components/feature";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { getFragmentParams } from "@/lib/get-fragment-params";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Image, Text, Title, Anchor } from "@mantine/core";
import siteCopy from "copy/en";

const { features, offerings } = siteCopy;

const Home: NextPage = () => {
	const router = useRouter();
	const { user, isLoading } = useUser();
	const [shouldRedirect, setShouldRedirect] = useState(false);
	const isSignedIn = user;
	let isWaitingForSignIn = false;
	let refreshToken: string;

	if (!isSignedIn) {
		/**
		 * Get fragment params. Will only exist if bug happens in supabase helpers -
		 * causing the successful signin with third party to not be registered -
		 * here on client side after re-direct from provider.
		 */
		const fragmentParams = getFragmentParams(router.asPath);
		refreshToken = fragmentParams.refresh_token;

		if (refreshToken) {
			/* Function to manually sign user in with refresh token from fragment. */
			const signUserInWithRefreshToken = () => {
				supabaseClient.auth.setSession(refreshToken);
			};
			/*
			 * To avoid sign in page flicker while waiting for sign in.
			 * Page will re-render after successful sign in and isWaitingForSignIn -
			 * will be set to false while isSignedIn will be true
			 */
			isWaitingForSignIn = true;
			signUserInWithRefreshToken();
		}
	}

	useEffect(() => {
		if (shouldRedirect && !isWaitingForSignIn) {
			router.replace(router.pathname, undefined);
		}
	}, [shouldRedirect, router, isWaitingForSignIn]);

	useEffect(() => {
		if (router.asPath.includes("access_token")) {
			setTimeout(() => {
				setShouldRedirect(true);
			}, 1400);
		} else {
			setShouldRedirect(false);
		}
	}, [router]);

	return (
		<AppLayout>
			<>
				<Head>
					<title>Hiair | Home</title>
				</Head>
				{/* TODO: Replace this loader with something decent with animations */}
				{(isLoading || isWaitingForSignIn) && (
					<section className="container mx-auto my-20 animate-pulse h-80 bg-secondary bg-opacity-5"></section>
				)}
				{!isLoading && !isWaitingForSignIn && (
					<>
						<HomeBanner />
						<section className="container mx-auto mt-20">
							<Title className="mb-12 font-serif text-4xl text-center text-black dark:text-white">
								Our Feature Pipelines
							</Title>
							<div className="flex flex-row flex-wrap justify-around gap-8">
								{offerings.map((item, index) => {
									return (
										<div
											className="flex flex-col items-center justify-center w-1/4 p-4 text-center text-black rounded-md gap-y-4 h-80 dark:text-white dark:bg-secondaryYellow bg-primaryAlt"
											key={`FEATURE_${(index + 45) * 45}`}
										>
											<div className="flex items-center justify-center bg-white rounded-full w-28 h-28">
												<Image alt="screening icon" width={64} src={`/images/home/${item.icon}.png`} />
											</div>
											<Title order={3} className="font-serif text-xl font-bold text-white">
												{item.label}
											</Title>
											<Text className="text-base text-shadeBlack">{item.summary}</Text>
										</div>
									);
								})}
							</div>
						</section>
						<section className="container mx-auto mt-20">
							<Title className="mb-12 font-serif text-4xl text-center text-black dark:text-white">
								How can Hiair help you ?
							</Title>
							<div className="flex flex-row flex-wrap justify-around gap-8">
								{features.map((item, index) => {
									return (
										<div
											className="grid grid-cols-[200px_minmax(500px,_1fr)] gap-x-2 items-center justify-between w-8/12 h-36 p-4 dark:text-white text-black dark:bg-secondaryBlue bg-secondaryYellow rounded-md text-center"
											key={`FEATURE_${(index + 45) * 45}`}
										>
											<div className="flex items-center justify-center mx-auto rounded-full w-28 h-28 bg-white/60">
												<Image alt="screening icon" width={64} src={`/images/home/${item.icon}.png`} />
											</div>
											<div className="flex flex-col items-start justify-start gap-y-2">
												<Title order={3} className="font-serif text-xl font-bold text-black">
													{item.label}
												</Title>
												<Text className="text-base text-shadeBlack">{item.summary}</Text>
											</div>
										</div>
									);
								})}
							</div>
						</section>
						<section className="container mx-auto mt-20">
							<Title className="mb-12 font-serif text-4xl text-center text-black dark:text-white">
								We are backed by
							</Title>
							<Anchor href="https://vittbi.com/meity.php" target="_blank">
								<Image
									width="100%"
									src="/images/meity.jpg"
									classNames={{ image: "mx-auto" }}
									className="hover:cursor-pointer"
									alt="vit funding"
								></Image>
							</Anchor>
						</section>
					</>
				)}
			</>
		</AppLayout>
	);
};

export default Home;
