import Link from "next/link";
import { ActionIcon, Avatar, Title, useMantineColorScheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { LinkButton } from "./header";

const AppNavigation = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const session = useSession();
	const isDark = colorScheme === "dark";

	return (
		<section className="container flex flex-row items-center justify-between w-full h-16 p-2 pt-4 mx-auto">
			<div className="flex flex-row items-center justify-between w-full">
				<Link href="/" passHref>
					<Title className="select-none dark:text-white text-primary hover:cursor-pointer">HiAir</Title>
				</Link>
				<div className="flex items-center space-x-8 font-sans text-base">
					{!session.data && (
						<>
							<LinkButton label="Contact" link="/contact" />
							<LinkButton
								label="Login"
								isButton
								link=""
								handleClick={() => signIn(undefined, { callbackUrl: "/onboarding" })}
							/>
						</>
					)}
					{session.data && (
						<>
							<LinkButton label="Hiair Beta" link="/hiair-beta" />
							<LinkButton label="Candidates" link="/candidates" />
							<LinkButton label="Request" link="/request" />
							<LinkButton isButton handleClick={() => signOut({ callbackUrl: "/" })} label="Logout" link="/logout" />
							<Avatar src={session.data?.user?.image} radius="xl" alt={session.data?.user?.name ?? "user profile"} />
						</>
					)}

					<ActionIcon
						className={
							isDark
								? "text-secondaryYellow bg-black rounded-full hover:bg-primaryAlt hover:text-white"
								: "text-white bg-black rounded-full hover:bg-primaryAlt hover:text-black"
						}
						onClick={() => toggleColorScheme()}
						size="2.4rem"
					>
						{isDark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
					</ActionIcon>
				</div>
			</div>
		</section>
	);
};

export default AppNavigation;
