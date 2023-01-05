import React from "react";
import Link from "next/link";
import { ActionIcon, Button, Title, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

const appLinks = [
	{ link: "/login", label: "Login" },
	{ link: "/contact", label: "Contact" },
];

const AppNavigation = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	const isDark = colorScheme === "dark";

	return (
		<section className="container flex flex-row items-center justify-between w-full h-16 p-2 pt-4 mx-auto">
			<div className="flex flex-row items-center justify-between w-full">
				<Link href="/" passHref>
					<Title className="select-none dark:text-white text-primary hover:cursor-pointer">HiAir</Title>
				</Link>
				<div className="space-x-8 font-sans text-base flex items-center">
					{appLinks.map(({ link, label }) => {
						const uniqueKey = `APP_LINK_KEY_${label}`;
						return (
							<Link key={uniqueKey} href={link} passHref>
								<Button
									className="hover:text-secondaryYellow dark:hover:text-primaryAlt active:text-secondaryYellow dark:text-white text-black bg-none hover:bg-transparent"
									component="a"
								>
									{label}
								</Button>
							</Link>
						);
					})}
					<ActionIcon className={isDark ? "text-secondaryYellow" : "text-primaryAlt"} onClick={() => toggleColorScheme()}>
						{isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
					</ActionIcon>
				</div>
			</div>
		</section>
	);
};

export default AppNavigation;
