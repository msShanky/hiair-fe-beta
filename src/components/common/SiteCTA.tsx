import React, { FC } from "react";
import { Button } from "@mantine/core";

type SiteCTAProps = {
	label: string;
	onClick: () => void;
};

export const SiteCTA: FC<SiteCTAProps> = (props) => {
	const { label, onClick } = props;
	return <Button onClick={onClick}>{label}</Button>;
};
