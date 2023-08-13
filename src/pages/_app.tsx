import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { ColorScheme, ColorSchemeProvider, MantineProvider, MantineTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";
import { Provider } from "react-redux";
import { store } from "app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const hiairTheme: Partial<MantineTheme> = {
	fontFamily: "Raleway, sans-serif",
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "light",
		getInitialValueInEffect: true,
	});

	const isDark = colorScheme === "dark";

	const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (isDark ? "light" : "dark"));

	useEffect(() => {
		// @ts-ignore
		document.body.className = isDark ? "dark-mode" : "light-mode";
		if (isDark) {
			document.documentElement.classList.add("dark");
			document.body.classList.add("bg-shadeBlack");
		} else {
			document.documentElement.classList.remove("dark", "bg-shadeBlack");
			document.body.classList.remove("bg-shadeBlack");
		}
	});

	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
					<MantineProvider withGlobalStyles withNormalizeCSS theme={hiairTheme}>
						<Notifications />
						<QueryClientProvider client={queryClient}>
							<Component {...pageProps} />
						</QueryClientProvider>
					</MantineProvider>
				</ColorSchemeProvider>
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
