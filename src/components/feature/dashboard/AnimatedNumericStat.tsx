import React, { FC, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

type AvailableStyleKeys = "default" | "candidate_card";

type AnimatedNumericStateProps = {
	value: number;
	label: string;
	type?: AvailableStyleKeys;
};

export const AnimatedNumericStat: FC<AnimatedNumericStateProps> = (props) => {
	const { value = 0, label, type = "default" } = props;
	const count = useMotionValue(0);
	const rounded = useTransform(count, (value) => {
		return `${value.toFixed(0)} ${type === "candidate_card" && "%"}`;
	});

	useEffect(() => {
		const animation = animate(count, value ?? 0, { duration: 2 });
		return animation.stop;
	}, [value, count]);

	const typeStyles = {
		candidate_card: `font-normal text-black dark:text-black text-xl`,
		default: `font-normal text-primary-focus dark:text-black md:text-4xl text-2xl`,
	};

	const labelStyles = {
		candidate_card: `text-xs text-black uppercase`,
		default: `text-xs md:text-base text-primary dark:text-white`,
	};

	if (!value || value === 0)
		return (
			<div className="flex flex-col items-center gap-y-2 min-w-max">
				<div className={typeStyles[type]}>0 %</div>
				<p className={labelStyles[type]}>{label}</p>
			</div>
		);

	return (
		<div className="flex flex-col items-center gap-y-2 min-w-max">
			<motion.h1 className={typeStyles[type]}>{rounded}</motion.h1>
			<p className={labelStyles[type]}>{label}</p>
		</div>
	);
};
