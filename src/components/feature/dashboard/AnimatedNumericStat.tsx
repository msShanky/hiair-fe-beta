import React, { FC, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Badge } from "@tremor/react";

const fiatCoins = ["BUSD", "USDT"];

type AnimatedNumericStateProps = {
	value: number;
	label: string;
	type?: string;
};

export const AnimatedNumericStat: FC<AnimatedNumericStateProps> = (props) => {
	const { value = 0, label } = props;
	const count = useMotionValue(0);
	const rounded = useTransform(count, (value) => {
		return `${value.toFixed(0)}`;
	});

	useEffect(() => {
		const animation = animate(count, value ?? 0, { duration: 2 });
		return animation.stop;
	}, [value, count]);

	const typeStyles = {
		buy_count: "font-sans font-semibold text-emerald-800 md:text-9xl text-6xl",
		balance: `text-red-600`,
		profit: `text-emerald-500`,
		buy_cancel: "text-red-600 md:text-xl text-lg",
		default: `font-normal text-primary-focus dark:text-black md:text-4xl text-2xl`,
	};

	if (!value)
		return (
			<div className="flex flex-col items-center gap-y-2 min-w-max">
				<div className={`font-sans font-semibold bg-primary-focus w-10/12 h-12 animate animate-pulse rounded-lg`}></div>
				<p className="w-10/12 h-4 rounded-lg bg-secondary animate animate-pulse">000</p>
			</div>
		);

	return (
		<div className="flex flex-col items-center gap-y-2 min-w-max">
			<motion.h1 className={typeStyles.default}>{rounded}</motion.h1>
			<p className="text-xs md:text-base text-primary dark:text-white">{label}</p>
		</div>
	);
};
