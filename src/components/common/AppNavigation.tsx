import React from "react";
import Link from "next/link";
import { Button, Image, Title } from "@mantine/core";

const appLinks = [
	{ link: "/login", label: "Login" },
	{ link: "/contact", label: "Contact" },
];

const AppNavigation = () => {
	return (
		<section className="container flex flex-row items-center justify-between w-full h-16 p-2 pt-4 mx-auto bg-white">
			<div className="flex flex-row items-center justify-between w-full">
				<Link href="/" passHref>
					<Title className="select-none text-primary hover:cursor-pointer">HiAir</Title>
				</Link>
				<div className="space-x-8 font-sans text-base">
					{appLinks.map(({ link, label }) => {
						const uniqueKey = `APP_LINK_KEY_${label}`;
						return (
							<Link key={uniqueKey} href={link} passHref>
								<Button
									className="hover:text-secondary active:text-pink text-primary bg-none hover:bg-transparent"
									component="a"
								>
									{label}
								</Button>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default AppNavigation;
