import { useRef, useState } from "react";
import { Text, Group, Button, createStyles, rem, Title } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	wrapper: {
		position: "relative",
		marginBottom: rem(30),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	dropzone: {
		borderWidth: rem(1),
		paddingBottom: rem(50),
	},

	icon: {
		color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
	},

	control: {
		position: "absolute",
		width: rem(250),
		left: `calc(50% - ${rem(125)})`,
		bottom: rem(-20),
		background: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.blue[4],
	},
}));

export const DropzoneButton = () => {
	const { classes, theme } = useStyles();
	const [isUploaded, setUploaded] = useState(false);
	const openRef = useRef<() => void>(null);

	const buttonBase =
		"text-white dark:hover:text-primary active:text-secondaryYellow bg-primary hover:bg-primaryAlt absolute -bottom-4";

	if (isUploaded) {
		return (
			<div className="flex flex-col items-center w-full gap-4 mt-10">
				<Title className="text-2xl font-normal text-primaryAlt">Uploaded the file, please wait for sometime. </Title>
				<Text className="text-base font-thin text-white">we are processing your file to populate your candidates</Text>
				<Button
					className={"text-white dark:hover:text-primary active:text-secondaryYellow bg-primary hover:bg-primaryAlt"}
					size="md"
					radius="xl"
					onClick={() => setUploaded(false)}
				>
					Upload Again
				</Button>
			</div>
		);
	}

	return (
		<div className={classes.wrapper}>
			<Dropzone
				openRef={openRef}
				onDrop={() => {
					setUploaded(true);
				}}
				className={classes.dropzone}
				radius="md"
				accept={[MIME_TYPES.csv]}
				maxSize={30 * 1024 ** 2}
			>
				<div style={{ pointerEvents: "none" }}>
					<Group position="center">
						<Dropzone.Accept>
							<IconDownload size={rem(50)} color={theme.colors[theme.primaryColor][6]} stroke={1.5} />
						</Dropzone.Accept>
						<Dropzone.Reject>
							<IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
						</Dropzone.Reject>
						<Dropzone.Idle>
							<IconCloudUpload
								size={rem(50)}
								color={theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black}
								stroke={1.5}
							/>
						</Dropzone.Idle>
					</Group>

					<Text ta="center" fw={700} fz="lg" mt="xl">
						<Dropzone.Accept>Drop files here</Dropzone.Accept>
						<Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
						<Dropzone.Idle>Upload resume</Dropzone.Idle>
					</Text>
					<Text ta="center" fz="sm" mt="xs" c="dimmed">
						Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that are less than 30mb in
						size.
					</Text>
				</div>
			</Dropzone>

			<Button className={buttonBase} size="md" radius="xl" onClick={() => openRef.current?.()}>
				Select files
			</Button>
		</div>
	);
};
