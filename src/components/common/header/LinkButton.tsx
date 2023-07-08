import React, { FC, HTMLProps } from "react";
import Link from "next/link";
import { Button } from "@mantine/core";

type LinkButtonProps = {
	link: string;
	label: string;
	isButton?: boolean;
	handleClick?: () => void;
};

export const LinkButton: FC<LinkButtonProps> = (props) => {
	const { link, label, isButton = false, handleClick } = props;

	const styles = {
		buttonBase:
			"text-black hover:text-secondaryYellow dark:hover:text-primaryAlt active:text-secondaryYellow dark:text-white bg-none hover:bg-black",
	};

	return isButton ? (
		<Button onClick={handleClick} className={styles.buttonBase}>
			{label}
		</Button>
	) : (
		<Link href={link} passHref>
			<Button className={styles.buttonBase}>{label}</Button>
		</Link>
	);
};
